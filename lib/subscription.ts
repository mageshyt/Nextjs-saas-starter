import { subscriptionPlans } from "@/config/subscriptions";
import { db } from "./db";
import { stripe } from "./stripe";

export const getUserSubscription = async (userId: string) => {
  if (!userId) return null;

  try {
    const userSubscription = await db.subscription.findFirst({
      where: { user_id: userId },
      include: { user: true, plan: true },
    });

    if (!userSubscription) return null;

    const hasActiveSubscription =
      userSubscription.plan_id &&
      (userSubscription.end_date?.getTime() || Date.now()) > Date.now();

    const userPlan = subscriptionPlans.find(
      (sub) =>
        sub.priceIdMonthly === userSubscription.plan_id ||
        sub.priceIdYearly === userSubscription.plan_id
    );

    const interval = hasActiveSubscription
      ? userSubscription.plan?.interval : null;

    let isCancelled = false;
    if (hasActiveSubscription && userSubscription.subscription_id) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        userSubscription.subscription_id
      );

      

      isCancelled =
        stripeSubscription.cancel_at_period_end ||
        stripeSubscription.status === "canceled";
    }

    return {
      ...userSubscription,
      stripeCurrentPeriodEnd: userSubscription.end_date,
      hasActiveSubscription,
      interval,
      isCancelled,
    };
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return null;
  }
};