import Link from "next/link"
import { ACCENT_COLORS, type Post } from "@/lib/types"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No posts yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => {
        const accentColor = ACCENT_COLORS.find((c) => c.value === post.accent)?.color || ACCENT_COLORS[0].color
        return (
        <article key={post.id} className="group">
          <Link href={`/post/${post.slug}`} className="block">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              <time className="text-sm text-muted-foreground">
                {formatDate(post.published_at || post.created_at)}
              </time>
            </div>
            <h2 
              className="font-serif text-2xl md:text-3xl mt-2 transition-colors text-balance"
              style={{ '--hover-color': accentColor } as React.CSSProperties}
            >
              <span className="group-hover:text-[var(--hover-color)] transition-colors">
                {post.title}
              </span>
            </h2>
            {post.excerpt && (
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
            {post.tags.length > 0 && (
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
          </Link>
        </article>
        )
      })}
    </div>
  )
}
