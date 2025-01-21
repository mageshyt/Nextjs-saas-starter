"use client"
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { BorderBeam } from '@/components/ui/border-beam'
import Image from 'next/image'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import { cn } from '@/lib/utils'

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id='hero-section' className='relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8'>
      {/* Animated Shiny Text */}
      <div className='backdrop-filter-[12px] inline-flex h-8 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0'>
        <AnimatedShinyText className='inline-flex items-center justify-center'>
          <span>✨ Introducing Next SAAS Starter</span>{' '}
          <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
        </AnimatedShinyText>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-80%] animate-fade-in opacity-0 h-[200%] skew-y-12",
        )}
      />
      {/* Hero Section */}
      <h1
        className='bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]'
      >
        Build Smarter, Style Faster
        <br className='hidden md:block' />
        with Next.js + SAAS.
      </h1>
      <p className='mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]'>
        Beautifully designed, crafted, implemented, and built with the best tech stack
        <br className='hidden md:block' /> Tailwind CSS, React, and Framer Motion.
      </p>

      {/* Get Started */}
      <Button className='translate-y-[-1rem]  animate-fade-in gap-1 rounded-lg text-white dark:text-black opacity-0 ease-in-out [--animation-delay:600ms]'>
        <span>Get Started for free </span>
        <ArrowRightIcon className='ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
      </Button>


      <div
        ref={ref}
        className='relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]'>
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--primary-color),var(--primary-color),transparent_40%)] ${inView ? 'before:animate-image-glow' : ''
            }`}>
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom='var(--primary-color)'
            colorTo='var(--secondary-color)'
          />
          <Image
            src='/banner.png'
            className='hidden relative w-full h-full rounded-[inherit] border object-contain dark:block'
            width={1336}
            height={800}
            alt='Hero Image'
          />
        </div>
      </div>

    </section>
  )
}

export default HeroSection
