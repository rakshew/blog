import { NextResponse } from "next/server"
import { requestSubscription, isValidEmail } from "@/lib/api/subscribers"
import { getEmailConfig, getResend } from "@/lib/email/resend"
import { confirmationEmail } from "@/lib/email/templates"

export async function POST(request: Request) {
  try {
    const { email, website } = await request.json()
    if (website) return NextResponse.json({ message: "If that email can be subscribed, a confirmation email has been sent." })
    if (typeof email !== "string" || !isValidEmail(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 })

    const result = await requestSubscription(email)
    if (result.shouldSend && result.subscriber) {
      const { from, siteUrl } = getEmailConfig()
      const message = confirmationEmail(siteUrl, result.subscriber.confirmation_token)
      const sent = await getResend().emails.send({ from, to: result.subscriber.email, ...message })
      if (sent.error) throw new Error(sent.error.message)
    }
    return NextResponse.json({ message: "If that email can be subscribed, a confirmation email has been sent." })
  } catch (error) {
    console.error("Subscription error", error)
    return NextResponse.json({ error: "Unable to process subscription" }, { status: 500 })
  }
}
