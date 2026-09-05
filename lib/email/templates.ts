import "server-only"

import type { Post } from "@/lib/types"
import type { Subscriber } from "@/lib/api/subscribers"

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!)
}

function contentHtml(content: string) {
  if (/<\/?[a-z][\s\S]*>/i.test(content)) return content
  return escapeHtml(content).replace(/\r?\n/g, "<br />")
}

export function confirmationEmail(siteUrl: string, token: string) {
  const url = `${siteUrl}/api/subscribe/confirm?token=${encodeURIComponent(token)}`
  return {
    subject: "Confirm your subscription",
    html: `<p>Thanks for subscribing to Rakshi. Confirm your subscription to receive new posts.</p><p><a href="${url}">Confirm subscription</a></p>`,
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
  return {
    to: subscriber.email,
    subject: post.title,
    html: `<article><p>Rakshi</p><time>${postDate}</time><h1>${escapeHtml(post.title)}</h1>${image}<div>${contentHtml(post.content)}</div><p><a href="${postUrl}">Read online</a></p><p><a href="${unsubscribeUrl}">Unsubscribe</a></p></article>`,
    headers: { "List-Unsubscribe": `<${unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  }
}
