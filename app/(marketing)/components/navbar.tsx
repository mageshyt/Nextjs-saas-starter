"use client"
import React from "react"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { marketingConfig } from "@/config/marketing"
import ListView from "@/components/global/list-view"
import Logo from "@/components/global/logo"

export default function Navbar() {
  const user = useUser()?.isSignedIn

  return (
    <header className="fixed top-0 left-0 z-50 w-full animate-fade-in opacity-0 border-b p-2 backdrop-blur-[12px] [--animation-delay:600ms]">
      <div className="flex h-[3rem] mx-4 items-center justify-between">
        {/* Logo */}
        <Link href="/" legacyBehavior passHref>
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center md:flex gap-6">
          <ListView
            items={marketingConfig.mainNav}
            render={(item, index) => (
              <Link href={item.href} key={index} className="text-sm hover:underline">
                {item.title}
              </Link>
            )}
          />
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
