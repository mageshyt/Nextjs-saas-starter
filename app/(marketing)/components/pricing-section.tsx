'use client';

import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { useSubscription } from '@/hooks/use-subscription';

import ListView from '@/components/global/list-view';
import LampPricing from '@/components/ui/lamp-pricing';
import { Switch } from '@/components/ui/switch';

import PricingCard from './pricing-card';
import { subscriptionPlans } from '@/config/subscriptions';


const PricingSection = () => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true, amount: 0.4 });
  const { onSubscribe, isProcessing, priceId } = useSubscription();

  const { user } = useUser();

  const [isYearly, setIsYearly] = useState(false);

  const onSubscribeClick = async (priceId: string) => {
    try {
      if (!user) {
        return;
      }
      // NOTE: This is a custom function that we created in the useSubscription hook
      await onSubscribe({ priceId });
    } catch (error) {
      console.error(error);

      toast.error("Subscription failed. Please try again.");
    }
  };


  return (
    <section id="pricing" className="py-10 " ref={ref}>
      {/* Heading */}
      <LampPricing />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInview ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}

        className="-mt-72  flex flex-col items-center justify-center">

        <motion.div
          className="flex items-center justify-center space-x-2  z-[10] ">
          <Switch id="interval" onCheckedChange={() => setIsYearly((perv) => !perv)} />
          <span>Annual</span>
          <span className="inline-block bg-black dark:bg-white px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase text-white dark:text-black">
            2 MONTHS FREE ✨
          </span>

        </motion.div>
        {/* pricing cards */}

        <div className="grid grid-cols-1 z-[10] gap-6 mt-6 sm:grid-cols-3">
          <ListView
            items={subscriptionPlans}
            render={(plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                user={user || null}
                isYearly={isYearly}
                exclusive={plan.exclusive}
                popular={plan.popular}
                handleCheckout={onSubscribeClick}
                isLoading={isProcessing}
                selectedPriceId={priceId}
              />
            )}
          />

        </div>

      </motion.div>
    </section>
  );
};


export default PricingSection;
