import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";
import { currentProfilePage } from "@/lib/current-user-page";
import { stripe } from "@/lib/stripe";



export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();
    const user = await currentProfilePage(req);

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata:{
        user_id: user.user_id,
        email: user.email,
      },
      customer_email: user.email,
      success_url: `${env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({
      message: "Checkout session created",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
