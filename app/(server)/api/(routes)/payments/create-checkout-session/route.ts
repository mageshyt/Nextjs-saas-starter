import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

import { currentProfilePage } from "@/lib/current-user-page";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/lib/subscription";

const dashboardUrl = absoluteUrl("/dashboard");

export async function POST(req: NextRequest) {
  let redirectUrl: string = "";
  try {
    const { priceId } = await req.json();
    const user = await currentProfilePage(req);

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const userSubscription = await getUserSubscription(user.id);
    console.log("User subscription:", userSubscription);

    if (userSubscription?.hasActiveSubscription && userSubscription?.stripeCustomerId && !userSubscription?.isCanceled) {
      // User on paid plan - redirect to billing portal
      const stripePortalSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: dashboardUrl
      });
      redirectUrl = stripePortalSession.url;
    } else {
      // User on free plan - create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          user_id: user.id,
          email: user.email,
          plan_id: priceId
        },
        customer: user.stripeCustomerId!,
        success_url: `${env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cancel`,
        subscription_data: {
          metadata: {
            user_id: user.id,
            email: user.email,
            plan_id: priceId
          }
        }
      });

      redirectUrl = session.url || "";
    }

    return NextResponse.json({
      message: "Checkout session created",
      session_url: redirectUrl,
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
