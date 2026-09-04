"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/client"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Logout
    </button>
  )
}
