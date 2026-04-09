import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { PostForm } from "@/components/admin/post-form"
import type { Post } from "@/lib/types"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (!post) {
    notFound()
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
        <h1 className="font-serif text-3xl mt-4">Edit Post</h1>
      </div>
      <PostForm post={post as Post} />
    </div>
  )
}
