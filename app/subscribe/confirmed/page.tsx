import Link from "next/link"

export default function ConfirmedPage() {
  return <main className="max-w-2xl mx-auto px-6 py-16"><h1 className="font-serif text-3xl">You&apos;re subscribed.</h1><Link href="/" className="inline-block mt-6 text-primary hover:underline">Back to the blog</Link></main>
}
