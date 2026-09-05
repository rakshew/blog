"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function SendNewsletterButton({ postId, sentAt }: { postId: string; sentAt: string | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (sentAt) return <span className="text-xs text-muted-foreground">Email sent</span>

  async function send() {
    if (!window.confirm("Send this post to all confirmed email subscribers?")) return
    setLoading(true)
    setMessage(null)
    const response = await fetch(`/api/admin/posts/${postId}/newsletter`, { method: "POST" })
    const data = await response.json()
    if (!response.ok) setMessage(data.error || "Unable to send")
    else setMessage(`${data.sent} sent`)
    setLoading(false)
    if (response.ok) router.refresh()
  }

  return <span className="inline-flex items-center gap-2"><button type="button" onClick={send} disabled={loading} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50">{loading ? "Sending..." : "Send Email"}</button>{message && <span className="text-xs text-muted-foreground">{message}</span>}</span>
}
