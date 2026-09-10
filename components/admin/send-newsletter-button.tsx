"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function SendNewsletterButton({ postId, sentAt }: { postId: string; sentAt: string | null }) {
  const router = useRouter()
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSend() {
    if (sending) return

    const confirmed = window.confirm(
      sentAt
        ? "Send this post again to all current subscribers?"
        : "Send this post to all current subscribers?"
    )
    if (!confirmed) return

    setSending(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin/posts/${postId}/newsletter`, { method: "POST" })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Unable to send email")

      const sent =
        typeof data.sent === "number"
          ? data.sent
          : typeof data.sentCount === "number"
            ? data.sentCount
            : null

      setMessage(sent === null ? "Email sent" : `${sent} sent`)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send email")
    } finally {
      setSending(false)
    }
  }

  return <span className="inline-flex items-center gap-2"><button type="button" onClick={handleSend} disabled={sending} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1 disabled:opacity-50">{sending ? "Sending..." : sentAt ? "Send Again" : "Send Email"}</button>{message && <span className="text-xs text-muted-foreground">{message}</span>}</span>
}
