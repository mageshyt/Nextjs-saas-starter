import { subscriptions } from "@/config/subscriptions";
import { db } from "./db";
import { stripe } from "./stripe";


export const getUserSubscription = async (userId: string) => {
  if (!userId) return null;

  try {
    const userSubscription = await db.subscription.findFirst({
      where: {
        user_id: userId
      },
      include: {
        user: true,
        plan: true
      }
    })

    if (!userSubscription) return null;

    const isPaid = userSubscription.plan_id && (userSubscription.end_date?.getTime() ?? Date.now()) > Date.now();


    const userPlan =
      subscriptions.find(subscriptions => subscriptions.priceIdMonthly === userSubscription.plan_id) ||
      subscriptions.find(subscriptions => subscriptions.priceIdYearly === userSubscription.plan_id);

    const interval = isPaid
      ? userPlan?.priceIdMonthly === userSubscription.plan_id ? "month" : "year" : null

    let isCancelled = false;

    if (isPaid && userSubscription.subscription_id) {
      const stripePlan = await stripe.subscriptions.retrieve(userSubscription.subscription_id);

      isCancelled = stripePlan.cancel_at_period_end
    }

    return {
      ...userSubscription,
      stripeCurrentPeriodEnd: userSubscription.end_date,
      isPaid,
      interval,
      isCancelled,
    }
  }
  catch (error) {
    console.error(error);
    return null;
  }
}
