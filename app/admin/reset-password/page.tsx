import { ResetPasswordForm } from "@/components/admin/reset-password-form"
import Link from "next/link"

type Props = {
  searchParams: Promise<{
    token?: string
    error?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams
  const { token, error } = params

  if (!token || error) {
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

          <div className="bg-destructive/10 text-destructive p-4 rounded-md text-sm space-y-4">
            <p>This password reset link is invalid or has expired.</p>
            <p className="text-xs text-destructive/80">
              Please request a new reset link to continue.
            </p>
          </div>

          <div className="mt-6 text-center text-sm">
            <p>
              <Link
                href="/admin/forgot-password"
                className="text-primary hover:underline"
              >
                Request a new reset link
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
            Enter your new password
          </p>
        </div>

        <ResetPasswordForm token={token} />

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
