import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/server"
import { getPostById, markNewsletterSent } from "@/lib/api/posts"
import { getActiveSubscribers } from "@/lib/api/subscribers"
import { sendNewsletter } from "@/lib/email/newsletter"

type Props = { params: Promise<{ id: string }> }

export async function POST(_request: Request, { params }: Props) {
  const { data: session } = await auth.getSession()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (session.user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { id } = await params
  const post = await getPostById(id)
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 })
  if (post.status !== "published") return NextResponse.json({ error: "Only published posts can be emailed" }, { status: 400 })

  const subscribers = await getActiveSubscribers()

  try {
    const sent = await sendNewsletter(post, subscribers)
    await markNewsletterSent(post.id)
    return NextResponse.json({ success: true, sent })
  } catch (error) {
    console.error("Newsletter error", error)
    return NextResponse.json({ error: "Unable to send newsletter" }, { status: 500 })
  }
}
