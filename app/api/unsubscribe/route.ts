import { NextResponse } from "next/server"
import { unsubscribeSubscriber } from "@/lib/api/subscribers"

async function unsubscribe(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")
  return token ? unsubscribeSubscriber(token) : false
}

export async function GET(request: Request) {
  const success = await unsubscribe(request)
  return NextResponse.redirect(new URL(success ? "/unsubscribe/success" : "/unsubscribe/invalid", request.url))
}

export async function POST(request: Request) {
  const success = await unsubscribe(request)
  return new NextResponse(null, { status: success ? 200 : 400 })
}
