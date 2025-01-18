import { subscriptionPlans } from "@/config/subscriptions";
import { env } from "@/env";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("Stripe-Signature");
    const event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature!,
      env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Stripe event received:", event.type);

    const handlers: Record<string, Function> = {
      "customer.subscription.created": () => handleSubscriptionEvent(event, "created"),
      "customer.subscription.updated": () => handleSubscriptionEvent(event, "updated"),
      "customer.subscription.deleted": () => handleSubscriptionEvent(event, "deleted"),
      "invoice.payment_succeeded": () => handleInvoiceEvent(event, "payment_succeeded"),
      "invoice.payment_failed": () => handleInvoiceEvent(event, "payment_failed"),
      "checkout.session.completed": () => handleCheckoutSessionCompletedEvent(event, req),
    };

    if (handlers[event.type]) {
      return handlers[event.type]();
    } else {
      return NextResponse.json({ status: 400, error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error constructing Stripe event:", error);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {
  try {
    const subscription = event.data.object as Stripe.Subscription;

    const { user_id, email, plan_id } = validateMetadata(subscription.metadata);
    const currentuser = await getUserById(user_id);

    if (!currentuser) {
      return NextResponse.json({ status: 401, error: "Unauthorized" });
    }

    const subscriptionData = {
      subscription_id: subscription.id,
      stripe_user_id: subscription.customer.toString(),
      status: subscription.status,
      start_date: new Date(subscription.created * 1000).toISOString(),
      end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      user_id: currentuser.id,
      email,
    };

    const plan = await db.subscriptionPlan.findUnique({
      where: { plan_id },
    });

    if (!plan) {
      return NextResponse.json({ status: 400, error: "Invalid plan_id" });
    }


    if (type === "created" || type == "updated") { 

      return handleCreatedSubscription(subscriptionData, plan, subscription, currentuser);
    }

    else if (type === "deleted") {

      await db.subscription.update({
        where: { subscription_id: subscription.id },
        data: { status: "canceled" },
      });

      return NextResponse.json({ status: 200, message: "Subscription deleted" });
    }


  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack)
    }
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

async function handleCreatedSubscription(subscriptionData: any, plan: any, subscription: any, currentuser: any) {
  console.log("Creating subscription for user:", subscriptionData.user_id);

  const newSubscription = await db.subscription.upsert({
    where: { user_id: currentuser.id },
    create: { ...subscriptionData, plan_id: plan.id },
    update: { ...subscriptionData, plan_id: plan.id },
  });

  console.log("Subscription created:", newSubscription);


  return NextResponse.json({ status: 200, message: "Subscription created" });
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  type: "payment_succeeded" | "payment_failed"
) {
  try {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription!.toString()
    );

    const { user_id, email, plan_id } = validateMetadata(subscription.metadata);
    const currentuser = await getUserById(user_id);

    if (!currentuser) {
      return NextResponse.json({ status: 401, error: "Unauthorized" });
    }

    const currentSubscription = await db.subscription.findFirst({
      where: { subscription_id: subscription.id },
    });

    if (!currentSubscription) {
      return NextResponse.json({ status: 400, error: "Invalid subscription" });
    }

    const invoiceData = {
      invoice_id: invoice.id,
      subscription_id: currentSubscription.id,
      amount_paid: type === "payment_succeeded" ? invoice.amount_paid / 100 : 0,
      amount_due: type === "payment_failed" ? invoice.amount_due / 100 : 0,
      currency: invoice.currency,
      user_id: currentuser.id,
      email,
      status: type === "payment_succeeded" ? "PAID" : "VOID" as "PAID" | "VOID",
    };

    const paymentData = {
      stripe_id: subscription.customer.toString(),
      email: email,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
      customer_details: JSON.stringify(subscription.metadata),
      payment_time: new Date(subscription.created * 1000).toISOString(),
      payment_intent: subscription.latest_invoice?.toString() || "",
      user_id: currentuser.id,
      status: type === "payment_succeeded" ? "SUCCEEDED" : "FAILED" as "SUCCEEDED" | "FAILED",
    }

    console.log("Invoice data:", invoiceData);

    const updatedInvoice = await db.invoice.upsert({
      where: { invoice_id: invoice.id },
      create: invoiceData,
      update: invoiceData,
    });


    await db.payment.upsert({
      where: {
        stripe_id_invoice_id: {
          stripe_id: subscription.customer.toString(),
          invoice_id: updatedInvoice.id,
        },
      },
      create: {
        ...paymentData,
        invoice_id: updatedInvoice.id
      },
      update: paymentData,

    })

    // Update user subscription plan if payment succeeded

    if (type === "payment_succeeded") {
      const userPlan =
        subscriptionPlans.find((plan) => plan.priceIdMonthly === plan_id) ||
        subscriptionPlans.find((plan) => plan.priceIdYearly === plan_id);

      console.log("User plan:", userPlan);
      const plan = userPlan?.title.includes("Basic") ? "BASIC" : "PRO";

      await db.user.update({
        where: { id: currentuser.id },
        data: { subscriptionPlan: plan },
      });

    }

    return NextResponse.json({ status: 200, message: "Invoice payment failed" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack)
    }
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}


async function handleCheckoutSessionCompletedEvent(
  event: Stripe.Event,
  req: NextRequest
) {
  return NextResponse.json({
    status: 200,
    message: "Checkout session completed",
  });
}

function validateMetadata(metadata: any) {
  if (!metadata.user_id || !metadata.email || !metadata.plan_id) {
    throw new Error("Invalid subscription metadata");
  }
  return metadata;
}
