"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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

        {/* Navigation Menu */}
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="#pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="#features" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Feature
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {user ? (
              <NavigationMenuItem>
                <UserButton />
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/sign-in" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Sign In
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/sign-up" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Sign Up
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}

            <NavigationMenuIndicator />
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </header>
  )
}