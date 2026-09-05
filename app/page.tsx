import { PostList } from "@/components/post-list"
import { getPublishedPosts } from "@/lib/api/posts"

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <main className="relative min-h-screen">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 md:py-12">
        <PostList posts={posts} />
      </div>
    </main>
  )
}
