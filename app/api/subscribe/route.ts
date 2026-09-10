import { NextResponse } from "next/server"
import { normalizeEmail, requestSubscription, isValidEmail } from "@/lib/api/subscribers"
import { getEmailConfig, getResend } from "@/lib/email/resend"
import { confirmationEmail } from "@/lib/email/templates"

function errorDetails(error: unknown) {
  const value = error as { code?: string; name?: string; message?: string }
  return {
    code: value?.code,
    name: value?.name,
    message: value?.message || "Unknown error",
  }
}

export async function POST(request: Request) {
  try {
    const { email: rawEmail, website } = await request.json()
    if (website) return NextResponse.json({ success: true, message: "You're subscribed." })
    const email = typeof rawEmail === "string" ? normalizeEmail(rawEmail) : ""
    if (!isValidEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })

    try {
      const subscription = await requestSubscription(email)
      if (subscription.shouldSend && subscription.subscriber) {
        const { from, siteUrl } = getEmailConfig()
        const result = await getResend().emails.send({
          from,
          to: subscription.subscriber.email,
          ...confirmationEmail(siteUrl, subscription.subscriber.confirmation_token),
        })
        if (result.error) throw new Error(result.error.message)
      }
    } catch (error) {
      console.error("Subscription database failed", errorDetails(error))
      return NextResponse.json({ error: "Unable to process subscription" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "You're subscribed." })
  } catch (error) {
    console.error("Subscription request failed", errorDetails(error))
    return NextResponse.json({ error: "Unable to process subscription" }, { status: 500 })
  }
}
