"use client"

import { useState } from "react"
import Link from "next/link"
import { signInAction } from "@/app/actions/auth"

export function LoginForm({ registered = false }: { registered?: boolean }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const result = await signInAction({ email, password, destination: "/", operation: "sign-in" })
    if (result.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {registered && <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-3 rounded-md">Check your email to verify your account.</div>}
      {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-center text-sm text-muted-foreground">
        New here? <Link href="/signup" className="text-primary hover:underline">Create account</Link>
      </p>
    </form>
  )
}
