"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/client"

export function AccountControl({ label }: { label: string }) {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="max-w-32 truncate text-muted-foreground" title={label}>{label}</span>
      <button type="button" onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors">Sign out</button>
    </div>
  )
}
