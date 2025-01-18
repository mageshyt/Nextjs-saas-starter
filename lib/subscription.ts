import { subscriptionPlans } from "@/config/subscriptions";
import { db } from "./db";
import { stripe } from "./stripe";
import { cache } from "react";

export const getUserSubscription =cache(async (userId: string) => {
  if (!userId) return null;

  try {
    const userSubscription = await db.subscription.findFirst({
      where: { user_id: userId },
      include: { user: true, plan: true },
    });

    if (!userSubscription) return null;

    const hasActiveSubscription: boolean =
      !!userSubscription.plan_id &&
      (userSubscription.end_date?.getTime() || Date.now()) > Date.now();

    const userPlan = subscriptionPlans.find(
      (sub) =>
        sub.priceIdMonthly === userSubscription.plan_id ||
        sub.priceIdYearly === userSubscription.plan_id
    );

    const interval = hasActiveSubscription
      ? userSubscription.plan?.interval : null;

    let isCanceled = false;
    if (hasActiveSubscription && userSubscription.subscription_id) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        userSubscription.subscription_id
      );

      

      isCanceled =
        stripeSubscription.cancel_at_period_end ||
        stripeSubscription.status === "canceled";
    }

    return {
      ...userSubscription.plan,
      name: userSubscription.plan?.name || "Free",
      description: userPlan?.description || "Free plan",
      stripeCurrentPeriodEnd: userSubscription.end_date,
      hasActiveSubscription,
      stripeCustomerId: userSubscription.stripe_user_id,
      interval,
      isCanceled,
    };
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return null;
  }
});