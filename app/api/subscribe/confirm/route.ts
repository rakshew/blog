import { NextResponse } from "next/server"
import { confirmSubscriber } from "@/lib/api/subscribers"
import { sendWelcomeEmail } from "@/lib/email/newsletter"

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")
  const result = token ? await confirmSubscriber(token) : null
  if (!result) return NextResponse.redirect(new URL("/subscribe/invalid", request.url))

  if (result.justActivated) {
    try {
      await sendWelcomeEmail({
        email: result.subscriber.email,
        unsubscribe_token: result.subscriber.unsubscribe_token,
      })
    } catch (error) {
      console.error("WELCOME_EMAIL_AFTER_CONFIRM_FAILED", {
        message: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return NextResponse.redirect(new URL("/subscribe/confirmed", request.url))
}
