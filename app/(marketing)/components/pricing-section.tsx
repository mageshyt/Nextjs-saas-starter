'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import ListView from '@/components/global/list-view';
import LampPricing from '@/components/ui/lamp-pricing';
import { Switch } from '@/components/ui/switch';

import PricingCard from './pricing-card';
import { plans } from '@/data/plants';

const PricingSection = () => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true, amount: 0.7 });


  const [isYearly, setIsYearly] = useState(false);

  const onSubscribeClick = async (userId: string, priceId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  };


  return (
    <section id="pricing" className="py-10 px-4" ref={ref}>
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
          className="flex items-center justify-center space-x-2  z-[100] ">
          <Switch id="interval" onCheckedChange={() => setIsYearly((perv) => !perv)} />
          <span>Annual</span>
          <span className="inline-block bg-black dark:bg-white px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase text-white dark:text-black">
            2 MONTHS FREE ✨
          </span>

        </motion.div>
        {/* pricing cards */}

        <div className="grid grid-cols-1 z-[100] gap-6 mt-6 sm:grid-cols-3">
          <ListView
            items={plans}
            render={(plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                isYearly={isYearly}
                exclusive={plan.exclusive}
                popular={plan.popular}
                handleCheckout={onSubscribeClick}
                priceIdMonthly='priceIdMonthly'
                priceIdYearly='priceIdYearly'
              />
            )}
          />

        </div>

      </motion.div>
    </section>
  );
};


export default PricingSection;
