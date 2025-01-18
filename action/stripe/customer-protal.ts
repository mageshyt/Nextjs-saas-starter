"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { currentUserProfile } from "@/lib/current-user";
import { redirect } from "next/navigation";

const billingUrl = absoluteUrl("/dashboard/billing");

export const openCustomerPortal = async (
  userStripeId: string,
) => {
  let redirectUrl: string = "";

  try {
    const user = await currentUserProfile();

    if (!user) {
      return {
        error: "Unauthorized",
      }
    }

    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    }


  } catch (error: any) {
    console.error("Error opening customer portal", error);
    return {
      error: error.message,
    }
  }
  redirect(redirectUrl);
}

