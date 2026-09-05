import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/server"
import { createImageUpload } from "@/lib/api/images"

export async function POST(request: Request) {
  const { data: session } = await auth.getSession()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (session.user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { contentType, size } = await request.json()
    const result = await createImageUpload({ contentType, size })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare image upload"
    const invalid = message.includes("Unsupported") || message.includes("exceeds")
    return NextResponse.json({ error: invalid ? message : "Unable to prepare image upload" }, { status: invalid ? 400 : 500 })
  }
}
