import { getUserById } from "@/action/user/get-user";
import { env } from "@/env";
import { currentProfilePage } from "@/lib/current-user-page";
import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);


export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('Stripe-Signature');
    const event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature!,
      env.STRIPE_WEBHOOK_SECRET
    )

    console.log("Stripe event received:", event.type);
    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "invoice.payment_succeeded":
        return handleInvoiceEvent(event, "payment_succeeded");
      case "invoice.payment_failed":
        return handleInvoiceEvent(event, "payment_failed");
      case "checkout.session.completed":
        return handleCheckoutSessionCompletedEvent(event, req);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  }
  catch (error) {
    console.error("Error constructing Stripe event:", error);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }

}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted",
) {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const { user_id, email, plan_id } = subscription.metadata;

    const currentuser = await getUserById(user_id);


    console.log("Subscription event received:", type, user_id, email, plan_id);

    if (!currentuser) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      })
    }

    if (!user_id || !email || !plan_id) {
      return NextResponse.json({
        status: 400,
        error: "Invalid subscription metadata",
      });
    }

    const subscriptionData = {
      subscription_id: subscription.id,
      stripe_user_id: subscription.customer.toString(),
      status: subscription.status,
      start_date: new Date(subscription.created * 1000).toISOString(),
      user_id: currentuser.id,
      email: email,
    }

    // check for valid plan_id
    const plan = await db.subscriptionPlan.findUnique({
      where: {
        plan_id: plan_id
      }
    })

    console.log("Subscription date:", subscriptionData);

    console.log("Subscription Plan:", plan);


    if (!plan) {
      return NextResponse.json({
        status: 400,
        error: "Invalid plan_id",
      });
    }

    switch (type) {
      case "created":
        console.log("Creating subscription for user:", user_id);
        // Save subscription data to database
        const sub = await db.subscription.create({
          data: {
            ...subscriptionData,
            plan_id: plan.id,
          }
        })
        console.log("Subscription created:", sub);

        // create a payment record
        await db.payment.create({
          data: {
            stripe_id: subscription.customer.toString(),
            email: email,
            subscription_id: sub.id,
            amount: plan.amount.toDecimalPlaces(2).toString(),
            currency: plan.currency,
            customer_details: JSON.stringify(subscription.metadata),
            payment_time: new Date(subscription.created * 1000).toISOString(),
            payment_intent: subscription.latest_invoice?.toString() || "",
            user_id: currentuser.id,
          }
        })

        console.log("Payment record created for subscription:", subscription.id);

        return NextResponse.json({
          status: 200,
          message: "Subscription created",
        });

      case "updated":
        // Update subscription data in database
        await db.subscription.update({
          where: {
            subscription_id: subscription.id
          },
          data: subscriptionData
        })

        return NextResponse.json({
          status: 200,
          message: "Subscription updated",
        });


      case "deleted":
        // change the status to deleted in the database
        await db.subscription.update({
          where: {
            subscription_id: subscription.id
          },
          data: {
            status: "deleted"
          }
        })

        return NextResponse.json({
          status: 200,
          message: "Subscription deleted",
        });

      default:
        return NextResponse.json({
          status: 400,
          error: "Invalid event type",
        });

    }
  }
  catch (error) {
    console.log("Error handling subscription event:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  type: "payment_succeeded" | "payment_failed",
) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription!.toString());

  console.log("Invoice Subscription:", subscription.metadata);

  const { user_id, email } = subscription.metadata;


  const currentuser = await getUserById(user_id);

  if (!currentuser) {
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    })
  }

  const currentSubscription = await db.subscription.findFirst({
    where: {
      subscription_id: subscription.id,
    }
  });

  if (!currentSubscription) {
    return NextResponse.json({
      status: 400,
      error: "Invalid subscription",
    });
  }
  console.log("Current Subscription:", currentSubscription);



  const invoiceData = {
    invoice_id: invoice.id,
    subscription_id: currentSubscription?.id,
    amount_paid: type === "payment_succeeded" ? invoice.amount_paid / 100 : 0,
    amount_due: type === "payment_failed" ? invoice.amount_due / 100 : 0,
    currency: invoice.currency,
    user_id: currentuser.id,
    email: email,
    status: type === "payment_succeeded" ? "PAID" : "VOID" as "PAID" | "VOID",
  };

  console.log("Invoice payment creating:", invoiceData);

  // Save invoice data to database
  const newInvoice = await db.invoice.upsert({
    where: {
      invoice_id: invoice.id
    },
    create: invoiceData,
    update: invoiceData
  })

  console.log("Invoice payment succeeded:", newInvoice);
  switch (type) {
    case "payment_succeeded":


      // update the payment record
      const updatedPayment = await db.payment.update({
        where: {
          stripe_id_subscription_id: {
            stripe_id: currentSubscription.stripe_user_id,
            subscription_id: currentSubscription.id
          }
        },
        data: {
          status: "SUCCEEDED"
        }
      })

      console.log("Payment record updated:", updatedPayment);

      return NextResponse.json({
        status: 200,
        message: "Invoice payment updated",
      })

    case "payment_failed":
      // update the payment record
      await db.payment.update({
        where: {
          stripe_id_subscription_id: {
            stripe_id: currentSubscription.stripe_user_id,
            subscription_id: currentSubscription.id
          }
        },
        data: {
          status: "FAILED"
        }
      })

      return NextResponse.json({
        status: 200,
        message: "Invoice payment failed updated",
      })

    default:
      return NextResponse.json({
        status: 400,
        error: "Invalid event type",
      });

  }
}

async function handleCheckoutSessionCompletedEvent(
  event: Stripe.Event,
  req: NextRequest) {

  return NextResponse.json({
    status: 200,
    message: "Checkout session completed",
  })
}
