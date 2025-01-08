import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full animate-fade-in opacity-0 border-b p-2  backdrop-blur-[12px] [--animation-delay:600ms]">

      <div className='flex h-[3rem] mx-4  items-center justify-between'>

        {/* Logo */}
        <div className='relative size-6'>
          <Image src='/logo.svg' fill className='object-cover' alt='logo' />
        </div>

        {/* Navigation - Login  */}
        <div className='ml-auto gap-6 flex h-full items-center'>
          <Link href='/sing-in'>
            <Button variant={"ghost"} className=''>
              Sign In
            </Button>
          </Link>


          <Link href='/sing-in'>
            <Button>
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header >
  )
}

export default Navbar
