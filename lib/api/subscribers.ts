import "server-only"

import { sql } from "@/lib/db"

export type Subscriber = {
  id: string
  email: string
  confirmation_token: string
  unsubscribe_token: string
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function requestSubscription(input: string): Promise<{ subscriber: Subscriber | null; shouldSend: boolean }> {
  const email = normalizeEmail(input)
  const created = await sql`
    INSERT INTO public.subscribers (email, status, confirmed_at, unsubscribed_at)
    VALUES (${email}, 'pending', NULL, NULL)
    ON CONFLICT (lower(email)) DO NOTHING
    RETURNING id, email, confirmation_token, unsubscribe_token
  `

  if (created.length > 0) {
    return { subscriber: created[0] as Subscriber, shouldSend: true }
  }

  const rows = await sql`
    SELECT id, email, status
    FROM public.subscribers
    WHERE lower(email) = ${email}
    LIMIT 1
  `
  const existing = rows[0] as { id: string; email: string; status: string } | undefined

  if (!existing) {
    throw new Error("Subscriber was not created")
  }

  if (existing.status === "active") return { subscriber: null, shouldSend: false }

  const updated = await sql`
    UPDATE public.subscribers
    SET status = 'pending', confirmed_at = NULL, unsubscribed_at = NULL
    WHERE id = ${existing.id}
    RETURNING id, email, confirmation_token, unsubscribe_token
  `
  return { subscriber: updated[0] as Subscriber, shouldSend: true }
}

export async function confirmSubscriber(confirmationToken: string) {
  const activated = await sql`
    UPDATE public.subscribers
    SET status = 'active', confirmed_at = COALESCE(confirmed_at, now()), unsubscribed_at = NULL
    WHERE confirmation_token = ${confirmationToken} AND status = 'pending'
    RETURNING id, email, status, confirmation_token, unsubscribe_token, created_at, confirmed_at, unsubscribed_at
  `

  if (activated.length > 0) return { subscriber: activated[0], justActivated: true }

  const existing = await sql`
    SELECT id, email, status, confirmation_token, unsubscribe_token, created_at, confirmed_at, unsubscribed_at
    FROM public.subscribers
    WHERE confirmation_token = ${confirmationToken}
    LIMIT 1
  `

  if (existing.length === 0) return null
  return { subscriber: existing[0], justActivated: false }
}

export async function unsubscribeSubscriber(token: string) {
  const rows = await sql`
    UPDATE public.subscribers
    SET status = 'unsubscribed', unsubscribed_at = now()
    WHERE unsubscribe_token = ${token} AND status <> 'unsubscribed'
    RETURNING id
  `
  return rows.length > 0
}

export async function getActiveSubscribers(): Promise<Subscriber[]> {
  return (await sql`
    SELECT id, email, confirmation_token, unsubscribe_token
    FROM public.subscribers
    WHERE status = 'active'
    ORDER BY created_at ASC
  `) as Subscriber[]
}
