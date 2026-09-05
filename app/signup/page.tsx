import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl tracking-tight hover:text-primary transition-colors">rakshi</Link>
          <p className="text-sm text-muted-foreground mt-2">Create your account</p>
        </div>
        <SignupForm />
      </div>
    </main>
  )
}
