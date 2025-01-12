import React from 'react'
import { LampContainer } from './lamp'
import { motion } from 'framer-motion';
const LampPricing = () => {
  return (
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-20 bg-gradient-to-br from-neutral-300 to-neutral-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Plans That
          <br /> Fit You Best
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="m-4 text-center text-sm md:text-xl text-slate-400  "
        >
          Choose a plan that fits your needs. All plans come with a 30-day money-back guarantee.
        </motion.p>
      </LampContainer>

  )
}

export default  LampPricing
