"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface DeletePostButtonProps {
  postId: string
  postTitle: string
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return
    }

    setLoading(true)
    const supabase = createClient()

    await supabase.from("posts").delete().eq("id", postId)

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-destructive hover:text-destructive/80 transition-colors px-3 py-1 disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  )
}
