import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-serif text-xl tracking-tight hover:text-primary transition-colors"
            >
              rakshi
            </Link>
            <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded">
              admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  )
}
