"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface DeletePostButtonProps {
  postId: string
  postTitle: string
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete post")
      }

      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred"
      setError(message)
      console.error("Delete error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-destructive hover:text-destructive/80 transition-colors px-3 py-1 disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
      {error && (
        <div className="text-sm text-destructive mt-2">
          {error}
        </div>
      )}
    </>
  )
}
