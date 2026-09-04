import { sql } from "@/lib/db"
import { PostList } from "@/components/post-list"
import type { Post } from "@/lib/types"

export const revalidate = 60

export default async function HomePage() {
  const posts = await sql`
    SELECT *
    FROM public.posts
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST
  `

  return (
    <main className="relative min-h-screen">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 md:py-12">
        <PostList posts={posts as Post[]} />
      </div>
    </main>
  )
}
