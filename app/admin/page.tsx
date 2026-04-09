import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ACCENT_COLORS, type Post } from "@/lib/types"
import { DeletePostButton } from "@/components/admin/delete-post-button"
import { LogoutButton } from "@/components/admin/logout-button"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  const typedPosts = (posts as Post[]) || []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Posts</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            New Post
          </Link>
          <LogoutButton />
        </div>
      </div>

      {typedPosts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="text-primary hover:underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border">
          {typedPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ACCENT_COLORS.find((c) => c.value === post.accent)?.color || ACCENT_COLORS[0].color }}
                    title={ACCENT_COLORS.find((c) => c.value === post.accent)?.label || 'Coral'}
                  />
                  <h2 className="font-medium truncate">{post.title}</h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  /{post.slug}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1"
                >
                  Edit
                </Link>
                <DeletePostButton postId={post.id} postTitle={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
