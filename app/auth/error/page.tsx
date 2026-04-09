import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-2xl mb-2">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">
          {error || "An error occurred during authentication."}
        </p>
        <Link href="/admin/login" className="text-primary hover:underline">
          Try again
        </Link>
      </div>
    </div>
  )
}
