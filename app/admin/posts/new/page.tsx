import { auth } from "@/lib/auth/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { PostForm } from "@/components/admin/post-form"

export const dynamic = "force-dynamic"

export default async function NewPostPage() {
  const { data: session } = await auth.getSession()

  if (!session?.user) {
    redirect("/admin/login")
  }

  if (session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to posts
        </Link>

        <h1 className="font-serif text-3xl mt-4">New Post</h1>
      </div>

      <PostForm />
    </div>
  )
}
