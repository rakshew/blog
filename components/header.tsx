import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight hover:text-primary transition-colors"
        >
          rakshi
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/tea"
            className="text-lg hover:opacity-70 transition-opacity"
            title="for us"
          >
            ☕
          </Link>

          <Link
            href="/write"
            className="text-lg hover:opacity-70 transition-opacity"
            title="for a line"
          >
            🌹
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
