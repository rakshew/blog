import { createClient } from "@/lib/supabase/server"
import { PostList } from "@/components/post-list"
import type { Post } from "@/lib/types"

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 md:py-12">
      <PostList posts={(posts as Post[]) || []} />
    </div>
  )
}
