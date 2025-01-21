"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { docsConfig } from "@/config/docs"
import { useRouter } from "next/navigation"

const SearchCommandMenu = () => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleClick = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const items = docsConfig.sidebarNav
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-64 lg:w-[300px]"
      >
        <span className="inline-flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search documentation...</span>
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {
            items.map((item, idx) => (
              <CommandGroup key={item.title + idx} heading={item.title}>
                {
                  item.items.map((subItem, idx) => (
                    <CommandItem
                      onSelect={() => handleClick(subItem.href)}
                      key={subItem.title + idx} >
                      {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                      {subItem.title}
                    </CommandItem>
                  ))
                }
              </CommandGroup>
            ))
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchCommandMenu