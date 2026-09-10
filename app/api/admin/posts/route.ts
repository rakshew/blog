import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/server"
import { createPost } from "@/lib/api/posts"
import { isHttpsUrl } from "@/lib/content/inline-images"

export async function POST(request: Request) {
  const { data: session } = await auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await request.json()

    const {
      title,
      slug,
      excerpt,
      content,
      tags,
      status,
      accent,
      is_poetry,
      published_at,
      cover_image_url,
      cover_image_alt,
      cover_image_caption,
      email_preview,
    } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug and content are required" },
        { status: 400 }
      )
    }

    if (status !== "draft" && status !== "published") {
      return NextResponse.json(
        { error: "Invalid post status" },
        { status: 400 }
      )
    }

    if (cover_image_url && !isHttpsUrl(cover_image_url)) {
      return NextResponse.json({ error: "Cover image URL must use HTTPS" }, { status: 400 })
    }

    const post = await createPost({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      tags: tags || [],
      status,
      accent,
      is_poetry,
      published_at: published_at || null,
      cover_image_url: cover_image_url || null,
      cover_image_alt: cover_image_alt || null,
      cover_image_caption: cover_image_caption || null,
      email_preview: email_preview || null,
    })

    return NextResponse.json({
      success: true,
      id: post.id,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    )
  }
}
