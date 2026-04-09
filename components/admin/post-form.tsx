"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ACCENT_COLORS, type Post, type AccentColor } from "@/lib/types"

interface PostFormProps {
  post?: Post
}

function formatForDatetimeLocal(dateString: string) {
  const date = new Date(dateString)
  const pad = (n: number) => String(n).padStart(2, "0")

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [tags, setTags] = useState(post?.tags.join(", ") || "")
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status || "draft"
  )
  const [accent, setAccent] = useState<AccentColor>(post?.accent || "coral")
  const [isPoetry, setIsPoetry] = useState(post?.is_poetry || false)
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? formatForDatetimeLocal(post.published_at) : ""
  )

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!post) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      accent,
      is_poetry: isPoetry,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
    }

    if (post) {
      const { error: updateError } = await supabase
        .from("posts")
        .update(postData)
        .eq("id", post.id)

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from("posts")
        .insert(postData)

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="published_at" className="text-sm font-medium">
          Post date and time
        </label>
        <input
          id="published_at"
          type="datetime-local"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground">
          This is the date shown on the post, above the title.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPoetry}
              onChange={(e) => setIsPoetry(e.target.checked)}
              className="w-4 h-4 rounded border-input accent-primary"
            />
            <span className="text-sm text-muted-foreground">Poetry mode</span>
          </label>
        </div>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className={`w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y text-sm ${
            isPoetry ? "font-serif leading-relaxed" : "font-mono"
          }`}
          placeholder={
            isPoetry
              ? "Write your poetry here...\nLine breaks will be preserved."
              : ""
          }
        />
        {isPoetry && (
          <p className="text-xs text-muted-foreground">
            Poetry mode preserves line breaks and uses serif typography.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tech, thoughts, life"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Accent Color</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setAccent(color.value)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                accent === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.color }}
              title={color.label}
            >
              <span className="sr-only">{color.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Selected: {ACCENT_COLORS.find((c) => c.value === accent)?.label}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
