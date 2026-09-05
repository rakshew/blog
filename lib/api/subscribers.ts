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
  const rows = await sql`SELECT * FROM public.subscribers WHERE lower(email) = ${email} LIMIT 1`
  const existing = rows[0] as (Subscriber & { status: string }) | undefined

  if (!existing) {
    const created = await sql`
      INSERT INTO public.subscribers (email)
      VALUES (${email})
      RETURNING id, email, confirmation_token, unsubscribe_token
    `
    return { subscriber: created[0] as Subscriber, shouldSend: true }
  }

  if (existing.status === "active") return { subscriber: null, shouldSend: false }

  const updated = await sql`
    UPDATE public.subscribers
    SET status = 'pending', confirmation_token = gen_random_uuid(), confirmed_at = NULL, unsubscribed_at = NULL
    WHERE id = ${existing.id}
    RETURNING id, email, confirmation_token, unsubscribe_token
  `
  return { subscriber: updated[0] as Subscriber, shouldSend: true }
}

export async function confirmSubscription(token: string) {
  const rows = await sql`
    UPDATE public.subscribers
    SET status = 'active', confirmed_at = now(), unsubscribed_at = NULL
    WHERE confirmation_token = ${token} AND status = 'pending'
    RETURNING id
  `
  return rows.length > 0
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
