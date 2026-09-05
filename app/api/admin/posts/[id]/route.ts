import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/server"
import { deletePost, updatePost } from "@/lib/api/posts"

type Props = {
  params: Promise<{ id: string }>
}

async function requireAdmin() {
  const { data: session } = await auth.getSession()

  if (!session?.user) {
    return { error: "Unauthorized", status: 401 }
  }

  if (session.user.role !== "admin") {
    return { error: "Forbidden", status: 403 }
  }

  return { session }
}

export async function PATCH(request: Request, { params }: Props) {
  const admin = await requireAdmin()

  if ("error" in admin) {
    return NextResponse.json(
      { error: admin.error },
      { status: admin.status }
    )
  }

  const { id } = await params

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

    const post = await updatePost(id, {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      tags: tags || [],
      status,
      accent,
      is_poetry,
      published_at: published_at || null,
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Unable to update post" },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const admin = await requireAdmin()

  if ("error" in admin) {
    return NextResponse.json(
      { error: admin.error },
      { status: admin.status }
    )
  }

  const { id } = await params

  try {
    const deletedId = await deletePost(id)

    if (!deletedId) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Unable to delete post" },
      { status: 500 }
    )
  }
}
