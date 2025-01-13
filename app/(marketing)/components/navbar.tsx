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
          <Button variant={"ghost"} className='' asChild>
            <Link href='/sign-in'>
              Sign In
            </Link>
          </Button>


          <Button asChild>
            <Link href='/sign-up'>
              Sign up
            </Link>
          </Button>
        </div>
      </div>
    </header >
  )
}

export default Navbar
