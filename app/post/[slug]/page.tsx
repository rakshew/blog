import { notFound } from "next/navigation"
import Link from "next/link"
import { ACCENT_COLORS } from "@/lib/types"
import {
  getPublishedPostBySlug,
  getPublishedPostMetadataBySlug,
} from "@/lib/api/posts"
import type { Metadata } from "next"
import { SubscribeForm } from "@/components/subscribe-form"
import { PostContent } from "@/components/post-content"

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const post = await getPublishedPostMetadataBySlug(slug)

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

  const post = await getPublishedPostBySlug(slug)

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

      {post.cover_image_url && (
        <figure className="mt-10">
          <img
            src={post.cover_image_url}
            alt={post.cover_image_alt || post.title}
            className="w-full h-auto rounded-md object-cover"
            decoding="async"
          />
          {post.cover_image_caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {post.cover_image_caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className={post.is_poetry ? "poetry-content" : undefined}>
        <PostContent content={post.content} isPoetry={post.is_poetry} />
      </div>
      <div className="mt-16">
        <SubscribeForm />
      </div>
    </article>
  )
}
