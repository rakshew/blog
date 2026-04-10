import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ACCENT_COLORS, type Post } from "@/lib/types"
import type { Metadata } from "next"

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !post) {
    return { title: "Post not found" }
  }

  return {
    title: `${post.title} | rakshi`,
    description: post.excerpt || undefined,
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !post) {
    notFound()
  }

  const typedPost = post as Post

  const accentColor =
    ACCENT_COLORS.find((c) => c.value === typedPost.accent)?.color ||
    ACCENT_COLORS[0].color

  return (
    <article className="max-w-2xl mx-auto px-6 py-8 md:py-12">
      {/* Accent line */}
      <div
        className="w-full h-1 rounded-full mb-8"
        style={{ backgroundColor: accentColor }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
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
        Back
      </Link>

      {/* Header */}
      <header className="mt-8">
        <time className="text-sm text-muted-foreground">
          {formatDate(typedPost.published_at || typedPost.created_at)}
        </time>

        <h1 className="font-serif text-2xl md:text-3xl mt-3 leading-tight text-balance">
          {typedPost.title}
        </h1>

        {typedPost.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {typedPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground border border-border px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className={`mt-10 prose prose-neutral dark:prose-invert max-w-none ${
          typedPost.is_poetry
            ? "font-serif text-lg leading-loose"
            : "text-lg leading-relaxed"
        }`}
        dangerouslySetInnerHTML={{
          __html: typedPost.content,
        }}
      />
    </article>
  )
}
