import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { AccessibilityToggle } from "./accessibility-toggle"
import { PenLine, MessageCircleHeart } from "lucide-react"
import { auth } from "@/lib/auth/server"
import { AccountControl } from "@/components/auth/account-control"

export async function Header() {
  const { data: session } = await auth.getSession()

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
          {session?.user ? (
            <>
              {session.user.role === "admin" && (
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
              )}
              <AccountControl label={session.user.name || session.user.email} />
            </>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
              <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">Create account</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
