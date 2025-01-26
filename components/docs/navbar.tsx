"use client"

import React from 'react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import SearchCommandMenu from './search-command'
import { Github } from 'lucide-react'
import Logo from '@/components/global/logo'

const DocsNavBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        {/* Nav Items */}
        <div className="ml-4 md:flex hidden flex-1 items-start space-x-6 justify-start">
          <nav className="flex items-center space-x-6">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-sm font-medium"
              )}
            >
              Documentation
            </Link>
            <Link
              href="/guides"
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-sm font-medium"
              )}
            >
              Guides
            </Link>
          </nav>
        </div>

        {/* Search and GitHub */}
        <div className="md:flex hidden items-center justify-end space-x-4">
          <div>
            <SearchCommandMenu />
          </div>
          <a
            href="https://github.com/mageshyt/nextjs-saas-starter"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
          >
            <Github className='size-6'/>
          </a>
        </div>
      </div>
    </header>
  )
}

export default DocsNavBar
