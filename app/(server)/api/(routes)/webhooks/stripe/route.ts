import { env } from "@/env";
import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);


export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json({
        status: 401,
        error: "Unauthorized",
      });
    }
    const signature = req.headers.get('Stripe-Signature');
    const event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      signature!,
      env.STRIPE_WEBHOOK_SECRET
    )

    console.log("Stripe event received:", event.type);
    switch (event.type) {
      case "customer.subscription.created":
        break
      case "customer.subscription.updated":
        break
      case "customer.subscription.deleted":
        break
      case "invoice.payment_succeeded":
        break
      case "invoice.payment_failed":
        break
      case "checkout.session.completed":
        break
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
 