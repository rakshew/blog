"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth/client"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: "/admin/reset-password",
      })

      setSuccess(true)
      setEmail("")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to send reset link"
      setError(message)
      console.error("Password reset error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="font-serif text-2xl tracking-tight hover:text-primary transition-colors"
            >
              rakshi
            </Link>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-sm space-y-4">
            <p>
              If an account exists for that email, a password reset link has been sent.
            </p>
            <p className="text-xs text-green-700">
              Please check your inbox and click the link to reset your password.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-center text-sm">
            <p>
              <Link
                href="/admin/login"
                className="text-primary hover:underline"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight hover:text-primary transition-colors"
          >
            rakshi
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            <Link
              href="/admin/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
