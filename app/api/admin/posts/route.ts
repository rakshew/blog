import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/server"
import { sql } from "@/lib/db"

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

    const rows = await sql`
      INSERT INTO public.posts (
        title,
        slug,
        excerpt,
        content,
        tags,
        status,
        accent,
        is_poetry,
        published_at,
        updated_at
      )
      VALUES (
        ${title},
        ${slug},
        ${excerpt || null},
        ${content},
        ${tags || []},
        ${status},
        ${accent},
        ${is_poetry},
        ${published_at || null},
        now()
      )
      RETURNING id
    `

    return NextResponse.json({
      success: true,
      id: rows[0].id,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    )
  }
}
