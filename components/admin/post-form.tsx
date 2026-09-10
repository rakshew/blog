"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ACCENT_COLORS, type Post, type AccentColor } from "@/lib/types"
import { isHttpsUrl } from "@/lib/content/inline-images"
import { RichPostEditor } from "@/components/admin/rich-post-editor"

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
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url || "")
  const [coverImageAlt, setCoverImageAlt] = useState(post?.cover_image_alt || "")
  const [coverImageCaption, setCoverImageCaption] = useState(post?.cover_image_caption || "")
  const [emailPreview, setEmailPreview] = useState(post?.email_preview || "")
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

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
    if (coverImageUrl && !isHttpsUrl(coverImageUrl)) {
      setError("Cover image URL must use HTTPS.")
      return
    }
    setLoading(true)
    setError(null)

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
      cover_image_url: coverImageUrl || null,
      cover_image_alt: coverImageAlt || null,
      cover_image_caption: coverImageCaption || null,
      email_preview: emailPreview || null,
    }

    try {
      const url = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts"
      const method = post ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `Failed to ${post ? "update" : "create"} post`)
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred"
      setError(message)
      console.error("Post submission error:", err)
      setLoading(false)
    }
  }

  async function handleImageChange(file: File | undefined) {
    if (!file) return
    setImageError(null)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]
    if (!allowedTypes.includes(file.type)) {
      setImageError("Use a JPEG, PNG, WebP, or AVIF image.")
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setImageError("Images must be 8 MB or smaller.")
      return
    }

    setImageUploading(true)
    try {
      const presignResponse = await fetch("/api/admin/images/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type, size: file.size }),
      })
      const presign = await presignResponse.json()
      if (!presignResponse.ok) throw new Error(presign.error || "Unable to prepare image upload")

      const uploadResponse = await fetch(presign.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!uploadResponse.ok) throw new Error("Image upload failed")
      setCoverImageUrl(presign.publicUrl)
    } catch (uploadError) {
      setImageError(uploadError instanceof Error ? uploadError.message : "Image upload failed")
    } finally {
      setImageUploading(false)
    }
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
        <RichPostEditor value={content} onChange={setContent} />
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

      <div className="space-y-4 border-t border-border pt-6">
        <h2 className="text-sm font-medium">Cover image</h2>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(event) => handleImageChange(event.target.files?.[0])}
          disabled={imageUploading}
          className="block w-full text-sm"
        />
        {imageUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        {imageError && <p className="text-sm text-destructive">{imageError}</p>}
        {coverImageUrl && (
          <div className="space-y-3">
            <img src={coverImageUrl} alt={coverImageAlt || "Cover preview"} className="max-h-64 w-full rounded-md object-cover" />
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => navigator.clipboard.writeText(coverImageUrl)} className="text-sm text-muted-foreground hover:text-foreground">Copy Image URL</button>
              <button type="button" onClick={() => { setCoverImageUrl(""); setCoverImageAlt(""); setCoverImageCaption("") }} className="text-sm text-destructive">Remove Image</button>
            </div>
            <input aria-label="Image alt text" value={coverImageAlt} onChange={(event) => setCoverImageAlt(event.target.value)} placeholder="Alt text" className="w-full px-3 py-2 border border-input rounded-md bg-background" />
            <input aria-label="Image caption" value={coverImageCaption} onChange={(event) => setCoverImageCaption(event.target.value)} placeholder="Caption" className="w-full px-3 py-2 border border-input rounded-md bg-background" />
          </div>
        )}
        <input
          aria-label="Cover image URL"
          type="url"
          value={coverImageUrl}
          onChange={(event) => setCoverImageUrl(event.target.value)}
          placeholder="Or paste an HTTPS image URL"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email_preview" className="text-sm font-medium">
          Email preview
        </label>
        <textarea
          id="email_preview"
          value={emailPreview}
          onChange={(event) => setEmailPreview(event.target.value)}
          rows={5}
          placeholder="Optional excerpt to send with the post email"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"
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
