import "server-only"

import type { Post } from "@/lib/types"
import type { Subscriber } from "@/lib/api/subscribers"
import { getEmailConfig, getResend } from "@/lib/email/resend"
import { newsletterEmail } from "@/lib/email/templates"

export async function sendNewsletter(post: Post, subscribers: Subscriber[]) {
  const resend = getResend()
  const { from, siteUrl } = getEmailConfig()
  let sent = 0

  for (let index = 0; index < subscribers.length; index += 100) {
    const batch = subscribers.slice(index, index + 100).map((subscriber) => {
      const email = newsletterEmail(siteUrl, post, subscriber)
      return { from, ...email }
    })
    const result = await resend.batch.send(batch)
    if (result.error) throw new Error(result.error.message)
    sent += batch.length
  }

  return sent
}
