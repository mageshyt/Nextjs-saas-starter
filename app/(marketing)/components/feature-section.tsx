"use client"
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import Heading from '@/components/global/heading'
import ListView from '@/components/global/list-view'
import { featuresData } from '@/data/features-data'
const FeatureSection = () => {
  return (
    <section id="features" className='flex flex-col justify-center items-center  max-w-7xl mx-auto p-4'>

      <Heading
        title='Next.js Starter Kit: A faster way to production'
        description='Your customers deserve a product built with the best technologies in our Nextjs Starter Kit'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full' >
        <ListView
          items={featuresData}
          render={(item, index) => (
            <motion.div
              key={index}
              className='p-6 border dark:bg-black text-left rounded'
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <Link href={item.url} target='_blank' rel="noopener noreferrer">
                {/* image */}
                <Image  src={item.image} alt={item.name} height={40} width={40} className='mb-3 rounded object-cover' />
                {/* text */}
                <div>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='text-gray-500 text-sm'>{item.description}</p>
                </div>
              </Link>
            </motion.div>
          )}
        />

      </div>
    </section>
  )
}

export default FeatureSection
