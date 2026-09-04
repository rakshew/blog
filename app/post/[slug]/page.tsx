import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ACCENT_COLORS, type Post } from "@/lib/types"
import type { Metadata } from "next"

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const rows = await sql`
    SELECT title, excerpt
    FROM public.posts
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `

  const post = rows[0] as Pick<Post, "title" | "excerpt"> | undefined

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

function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content)
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const rows = await sql`
    SELECT *
    FROM public.posts
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `

  const post = rows[0] as Post | undefined

  if (!post) {
    notFound()
  }

  const accentColor =
    ACCENT_COLORS.find((c) => c.value === post.accent)?.color ||
    ACCENT_COLORS[0].color

  return (
    <article className="max-w-2xl mx-auto px-6 py-8 md:py-12">
      <div
        className="w-full h-1 rounded-full mb-8"
        style={{ backgroundColor: accentColor }}
      />

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

      <header className="mt-8">
        <time className="text-sm text-muted-foreground">
          {formatDate(post.published_at || post.created_at)}
        </time>

        <h1 className="font-serif text-2xl md:text-3xl mt-3 leading-tight text-balance">
          {post.title}
        </h1>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
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

      {post.is_poetry ? (
        looksLikeHtml(post.content) ? (
          <div
            className="mt-10 font-serif text-lg leading-loose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="mt-10 font-serif text-lg leading-loose whitespace-pre-line">
            {post.content}
          </div>
        )
      ) : (
        <div
          className="mt-10 prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: looksLikeHtml(post.content)
              ? post.content
              : post.content
                  .split("\n\n")
                  .map((p) => `<p>${p}</p>`)
                  .join(""),
          }}
        />
      )}
    </article>
  )
}
