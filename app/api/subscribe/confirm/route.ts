import { NextResponse } from "next/server"
import { confirmSubscription } from "@/lib/api/subscribers"

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")
  const confirmed = token ? await confirmSubscription(token) : false
  return NextResponse.redirect(new URL(confirmed ? "/subscribe/confirmed" : "/subscribe/invalid", request.url))
}
