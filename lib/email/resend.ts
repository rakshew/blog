import "server-only"

import { Resend } from "resend"

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured")
  return new Resend(apiKey)
}

export function getEmailConfig() {
  const from = process.env.NEWSLETTER_FROM_EMAIL
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "")
  if (!from || !siteUrl) throw new Error("Email configuration is incomplete")
  return { from, siteUrl }
}
