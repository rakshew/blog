import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

type Props = { searchParams: Promise<{ registered?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { registered } = await searchParams

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl tracking-tight hover:text-primary transition-colors">rakshi</Link>
          <p className="text-sm text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        <LoginForm registered={registered === "1"} />
      </div>
    </main>
  )
}
