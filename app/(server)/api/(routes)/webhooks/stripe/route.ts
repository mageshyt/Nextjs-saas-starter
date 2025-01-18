import { subscriptions } from "@/config/subscriptions";
import { env } from "@/env";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { Subscription, User } from "@prisma/client";
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
    console.log("Subscription event:", subscription);

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

    console.log("Subscription data:", subscriptionData);
    console.log("Subscription Plan:", plan);

    switch (type) {
      case "created":
        return await handleCreatedSubscription(subscriptionData, plan, subscription, currentuser);

      case "updated":
        await db.subscription.update({
          where: { subscription_id: subscription.id },
          data: subscriptionData,
        });

        return NextResponse.json({ status: 200, message: "Subscription updated" });

      case "deleted":
        await db.subscription.update({
          where: { subscription_id: subscription.id },
          data: { status: "deleted" },
        });

        return NextResponse.json({ status: 200, message: "Subscription deleted" });

      default:
        return NextResponse.json({ status: 400, error: "Invalid event type" });
    }
  } catch (error) {
    console.error("Error handling subscription event:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

async function handleCreatedSubscription(subscriptionData: any, plan: any, subscription: any, currentuser: any) {
  console.log("Creating subscription for user:", subscriptionData.user_id);

  const newSubscription = await db.subscription.create({
    data: { ...subscriptionData, plan_id: plan.id },
  });

  console.log("Subscription created:", newSubscription);

  await db.payment.create({
    data: {
      stripe_id: subscription.customer.toString(),
      email: subscriptionData.email,
      subscription_id: newSubscription.id,
      amount: plan.amount.toDecimalPlaces(2).toString(),
      currency: plan.currency,
      customer_details: JSON.stringify(subscription.metadata),
      payment_time: new Date(subscription.created * 1000).toISOString(),
      payment_intent: subscription.latest_invoice?.toString() || "",
      user_id: currentuser.id,
    },
  });

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

    console.log("Invoice data:", invoiceData);

    await db.invoice.upsert({
      where: { invoice_id: invoice.id },
      create: invoiceData,
      update: invoiceData,
    });

    if (type === "payment_succeeded") {
      await handlePaymentSucceeded(currentSubscription, plan_id, currentuser);
    } else {
      await db.payment.update({
        where: {
          stripe_id_subscription_id: {
            stripe_id: currentSubscription.stripe_user_id,
            subscription_id: currentSubscription.id,
          },
        },
        data: { status: "FAILED" },
      });

      return NextResponse.json({ status: 200, message: "Invoice payment failed" });
    }
  } catch (error) {
    console.error("Error handling invoice event:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

async function handlePaymentSucceeded(currentSubscription: Subscription, plan_id: string, currentuser: User) {
  await db.payment.update({
    where: {
      stripe_id_subscription_id: {
        stripe_id: currentSubscription.stripe_user_id,
        subscription_id: currentSubscription.id,
      },
    },
    data: { status: "SUCCEEDED" },
  });

  const userPlan =
    subscriptions.find((plan) => plan.priceIdMonthly === plan_id) ||
    subscriptions.find((plan) => plan.priceIdYearly === plan_id);

  const plan = userPlan?.title === "Basic" ? "BASIC" : "PRO";

  await db.user.update({
    where: { id: currentuser.id },
    data: { subscriptionPlan: plan },
  });

  console.log("Payment succeeded and user subscription updated.");
  return NextResponse.json({ status: 200, message: "Payment succeeded" });
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
