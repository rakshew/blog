"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ACCENT_COLORS, type Post, type AccentColor } from "@/lib/types"
import { marked } from "marked"

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
      content: marked.parse(content), // Markdown → HTML
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

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Post date and time</label>
        <input
          type="datetime-local"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setContent(prev => `**${prev}**`)} className="text-xs border px-2 py-1 rounded">Bold</button>
        <button type="button" onClick={() => setContent(prev => `*${prev}*`)} className="text-xs border px-2 py-1 rounded">Italic</button>
        <button type="button" onClick={() => setContent(prev => prev + `\n\n![alt text](https://image-url.com)`)} className="text-xs border px-2 py-1 rounded">Image</button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className={`w-full px-3 py-2 border border-input rounded-md bg-background ${
            isPoetry ? "font-serif leading-relaxed" : "font-mono"
          }`}
          placeholder="Use: **bold**, *italic*, ![image](url)"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tags"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "draft" | "published")}
        className="w-full px-3 py-2 border border-input rounded-md bg-background"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
