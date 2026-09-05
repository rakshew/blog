"use client"

import { useState } from "react"

export function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Unable to subscribe")
      setMessage(data.message)
      setEmail("")
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to subscribe")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-y border-border py-8">
      <h2 className="font-serif text-2xl">Get new posts by email</h2>
      <p className="mt-2 text-sm text-muted-foreground">Receive new posts by email. Unsubscribe anytime.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
        <input aria-label="Email address" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="min-w-0 flex-1 px-3 py-2 border border-input rounded-md bg-background" />
        <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm disabled:opacity-50">{loading ? "Sending..." : "Subscribe"}</button>
      </form>
      {message && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </section>
  )
}
