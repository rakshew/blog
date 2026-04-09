import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight hover:text-primary transition-colors">
          rakshi
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
