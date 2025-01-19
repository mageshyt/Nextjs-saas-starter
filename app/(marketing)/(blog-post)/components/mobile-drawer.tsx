"use client"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { List } from "lucide-react"


import React, { useState } from 'react'
import { CategoryLink } from "./blog-header"
import { BLOG_CATEGORIES } from "@/config/blog"

interface MobileDrawerProps {
  slug: string
}
const MobileDrawer = ({ slug }: MobileDrawerProps) => {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Drawer open={open} onOpenChange={closeDrawer}>
      <DrawerTrigger
        className="mb-8 flex w-full items-center border-y p-3 text-foreground/90 md:hidden"
      >
        <List className="size-[18px]" />
        <p className="ml-2.5 text-sm font-medium">Categories</p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>Select a section to navigate</DrawerDescription>
        </DrawerHeader>

        <ul role="list" className="mb-14 w-full p-3 text-muted-foreground">
          <CategoryLink
            title="All"
            href="/blog"
            active={!slug}
            clickAction={closeDrawer}
            mobile
          />
          {BLOG_CATEGORIES.map((category) => (
            <CategoryLink
              key={category.slug}
              title={category.title}
              href={`/blog/category/${category.slug}`}
              active={category.slug === slug}
              clickAction={closeDrawer}
              mobile
            />
          ))}
          <CategoryLink
            title="Guides"
            href="/guides"
            active={false}
            mobile
          />
        </ul>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
