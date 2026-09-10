import "server-only"

import type { Post } from "@/lib/types"
import type { Subscriber } from "@/lib/api/subscribers"
import { hasInlineImageMarker, parseInlinePostContent } from "@/lib/content/inline-images"

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!)
}

function contentHtml(content: string) {
  if (/<\/?[a-z][\s\S]*>/i.test(content) && !hasInlineImageMarker(content)) return content

  return parseInlinePostContent(content)
    .map((segment) => {
      if (segment.type === "text") return escapeHtml(segment.value).replace(/\r?\n/g, "<br />")

      if (segment.type === "instagram") return ""

      const image = `<figure><img src="${escapeHtml(segment.value.url)}" alt="${escapeHtml(segment.value.alt)}" />${segment.value.caption ? `<figcaption style="font-size: small; color: #666; text-align: center;">${escapeHtml(segment.value.caption)}</figcaption>` : ""}</figure>`
      return image
    })
    .join("")
}

function plainPreview(content: string) {
  const text = parseInlinePostContent(content)
    .filter((segment) => segment.type === "text")
    .map((segment) => segment.value)
    .join("")
    .replace(/<[^>]*>/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim()

  if (text.length <= 1000) return text

  const shortened = text.slice(0, 1000)
  const boundaryMatches = [...shortened.matchAll(/[.!?](?=\s|$)/g)]
  const sentenceBoundary = boundaryMatches.filter((match) => (match.index ?? 0) >= 700).pop()
  if (sentenceBoundary?.index !== undefined) return shortened.slice(0, sentenceBoundary.index + 1).trim()

  const paragraphBoundary = shortened.lastIndexOf("\n\n")
  if (paragraphBoundary >= 700) return shortened.slice(0, paragraphBoundary).trim()

  const wordBoundary = shortened.lastIndexOf(" ")
  return shortened.slice(0, wordBoundary > 0 ? wordBoundary : 1000).trim()
}

export function confirmationEmail(siteUrl: string, token: string) {
  const url = `${siteUrl}/api/subscribe/confirm?token=${encodeURIComponent(token)}`
  return {
    subject: "Confirm your subscription",
    html: `<p>Thanks for subscribing to Rakshi. Confirm your subscription to receive new posts.</p><p><a href="${url}">Confirm subscription</a></p>`,
  }
}

export function welcomeEmail(subscriber: Pick<Subscriber, "email" | "unsubscribe_token">) {
  return {
    to: subscriber.email,
    subject: "It has been officiated :D",
    html: `<p>Now that you have subscribed to my blog, I suppose it has been officiated that we are true companions who wish each other well :D Occasionally, allow me to slip a letter beneath your door, containing whatever I dearly wish to share with you. Thank you for choosing to stay and listen. May we continue<br />to treasure this little friendship together. Allow me to host you with a tumbler of tea held in our palms, and may we yap all things wonderfully inconsequential.</p><p>Owing to the limits of my database, I am unable to keep a comment section<br />here. But should you ever wish to write back, you may find me on Instagram at<br /><a href="https://www.instagram.com/kumizh.uwu/">@kumizh.uwu</a>, so that this correspondence need not remain entirely one-sided.</p><p>See you along the way of our lives,<br />With hearty wishes,<br />Kumizh &lt;3</p>`,
  }
}

export function newsletterEmail(siteUrl: string, post: Post, subscriber: Subscriber) {
  const postUrl = `${siteUrl}/post/${encodeURIComponent(post.slug)}`
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}`
  const postDate = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const image = post.cover_image_url
    ? `<figure><img src="${escapeHtml(post.cover_image_url)}" alt="${escapeHtml(post.cover_image_alt || post.title)}" />${post.cover_image_caption ? `<figcaption>${escapeHtml(post.cover_image_caption)}</figcaption>` : ""}</figure>`
    : ""
  const preview = post.email_preview && post.email_preview.trim() ? post.email_preview : plainPreview(post.content)
  const continuationText = "That is all I could squeeze into your postbox. The rest of it awaits you at the printing press."
  return {
    to: subscriber.email,
    subject: post.title,
    html: `<article><p>Rakshi</p><time>${postDate}</time><h1>${escapeHtml(post.title)}</h1>${image}<div>${escapeHtml(preview).replace(/\r?\n/g, "<br />")}</div><p style="margin: 28px 0 18px; font-size: 15px; line-height: 1.7; font-style: italic;">${continuationText}</p><p><a href="${postUrl}">Continue reading →</a></p><p><a href="${unsubscribeUrl}">Unsubscribe</a></p></article>`,
    headers: { "List-Unsubscribe": `<${unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  }
}
