import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ACCENT_COLORS, type Post } from "@/lib/types"
import type { Metadata } from "next"

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!post) {
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

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!post) {
    notFound()
  }

  const typedPost = post as Post
  const accentColor = ACCENT_COLORS.find((c) => c.value === typedPost.accent)?.color || ACCENT_COLORS[0].color

  return (
    <article className="max-w-2xl mx-auto px-6 py-8 md:py-12">
      <div 
        className="w-full h-1 rounded-full mb-8"
        style={{ backgroundColor: accentColor }}
      />
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors inline-flex items-center gap-1"
        style={{ '--accent': accentColor } as React.CSSProperties}
        onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
        onMouseLeave={(e) => e.currentTarget.style.color = ''}
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

      <header className="mt-8">
        <time className="text-sm text-muted-foreground">
          {formatDate(typedPost.published_at || typedPost.created_at)}
        </time>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-3 leading-tight text-balance">
          {typedPost.title}
        </h1>
        {typedPost.tags.length > 0 && (
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

      <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
        {typedPost.is_poetry ? (
          <div className="font-serif text-lg leading-loose whitespace-pre-line">
            {typedPost.content}
          </div>
        ) : (
          <div
            className="text-lg leading-relaxed space-y-6 [&>p]:mb-6"
            dangerouslySetInnerHTML={{
              __html: typedPost.content
                .split("\n\n")
                .map((p) => `<p>${p}</p>`)
                .join(""),
            }}
          />
        )}
      </div>
    </article>
  )
}
