"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const user = useUser()?.isSignedIn

  return (
    <header className="fixed top-0 left-0 z-50 w-full animate-fade-in opacity-0 border-b p-2 backdrop-blur-[12px] [--animation-delay:600ms]">
      <div className="flex h-[3rem] mx-4 items-center justify-between">
        {/* Logo */}
        <Link href="/" legacyBehavior passHref>
          <a className="relative size-6">
            <Image src="/logo.svg" fill className="object-cover" alt="logo" />
          </a>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center md:flex gap-6">
          <Link href="/blog" className="text-sm hover:underline font-medium">
            Blog
          </Link>
          <Link href="/docs" className="text-sm hover:underline font-medium">
            Documentation
          </Link>
          <Link href="#pricing" className="text-sm hover:underline font-medium">
            Pricing
          </Link>
          <Link href="#features" className="text-sm hover:underline font-medium">
            Features
          </Link>
        </nav>

        {/* User Actions */}
        <div className=" flex h-full items-center gap-6">
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href={"/dashboard"}
                className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none  "
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {user ? "Dashboard" : "Get Started"}
                </span>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
