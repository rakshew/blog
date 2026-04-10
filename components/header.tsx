"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { AccessibilityToggle } from "./accessibility-toggle"
import { PenLine, MessageCircleHeart } from "lucide-react"

export function Header() {
  return (
    <header className="py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight hover:text-primary transition-colors"
        >
          rakshi
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-4">

          {/* Tea / Shared moment */}
          <Link
            href="/tea"
            className="hover:opacity-70 transition-opacity"
            title="a cup between us"
          >
            <MessageCircleHeart className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.5} />
          </Link>

          {/* Writing */}
          <Link
            href="/write"
            className="hover:opacity-70 transition-opacity"
            title="for a line"
          >
            <PenLine className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.5} />
          </Link>

          <AccessibilityToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
