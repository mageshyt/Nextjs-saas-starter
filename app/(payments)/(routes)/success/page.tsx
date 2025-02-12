import Navbar from '@/app/(marketing)/components/navbar';
import { Button } from '@/components/ui/button';
import { LockOpen } from 'lucide-react';
import Link from 'next/link';


export default async function SuccessPage() {

  return (
    <main className="flex min-w-screen flex-col  items-center justify-between">
      <Navbar />
      <h1 className="mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome to Nextjs Starter Kit 🎉
      </h1>
      <p className="leading-7 text-center w-[60%]">
        Let&apos;s get cooking
      </p>
      <Link href="/dashboard" className='mt-4'>
        <Button>
          <LockOpen className="mr-2 size-6" />
          Access Dashboard</Button>
      </Link>
    </main>
  )
}
