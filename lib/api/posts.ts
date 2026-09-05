import "server-only"

import { sql } from "@/lib/db"
import type { Post } from "@/lib/types"

export type PostInput = {
  title: string
  slug: string
  excerpt: string | null
  content: string
  tags: string[]
  status: Post["status"]
  accent: Post["accent"]
  is_poetry: boolean
  published_at: string | null
  cover_image_url: string | null
  cover_image_alt: string | null
  cover_image_caption: string | null
}

export async function getPublishedPosts(): Promise<Post[]> {
  return (await sql`
    SELECT *
    FROM public.posts
    WHERE status = 'published'
    ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC
  `) as Post[]
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const rows = await sql`
    SELECT *
    FROM public.posts
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `

  return (rows[0] as Post | undefined) || null
}

export async function getPublishedPostMetadataBySlug(
  slug: string
): Promise<Pick<Post, "title" | "excerpt"> | null> {
  const rows = await sql`
    SELECT title, excerpt
    FROM public.posts
    WHERE slug = ${slug}
      AND status = 'published'
    LIMIT 1
  `

  return (rows[0] as Pick<Post, "title" | "excerpt"> | undefined) || null
}

export async function getAllPosts(): Promise<Post[]> {
  return (await sql`
    SELECT *
    FROM public.posts
    ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC
  `) as Post[]
}

export async function getPostById(id: string): Promise<Post | null> {
  const rows = await sql`
    SELECT *
    FROM public.posts
    WHERE id = ${id}
    LIMIT 1
  `

  return (rows[0] as Post | undefined) || null
}

export async function createPost(data: PostInput): Promise<{ id: string }> {
  const rows = await sql`
    INSERT INTO public.posts (
      title,
      slug,
      excerpt,
      content,
      tags,
      status,
      accent,
      is_poetry,
      published_at,
      cover_image_url,
      cover_image_alt,
      cover_image_caption,
      updated_at
    )
    VALUES (
      ${data.title},
      ${data.slug},
      ${data.excerpt},
      ${data.content},
      ${data.tags},
      ${data.status},
      ${data.accent},
      ${data.is_poetry},
      ${data.published_at},
      ${data.cover_image_url},
      ${data.cover_image_alt},
      ${data.cover_image_caption},
      now()
    )
    RETURNING id
  `

  return rows[0] as { id: string }
}

export async function updatePost(
  id: string,
  data: PostInput
): Promise<{ id: string } | null> {
  const rows = await sql`
    UPDATE public.posts
    SET
      title = ${data.title},
      slug = ${data.slug},
      excerpt = ${data.excerpt},
      content = ${data.content},
      tags = ${data.tags},
      status = ${data.status},
      accent = ${data.accent},
      is_poetry = ${data.is_poetry},
      published_at = ${data.published_at},
      cover_image_url = ${data.cover_image_url},
      cover_image_alt = ${data.cover_image_alt},
      cover_image_caption = ${data.cover_image_caption},
      updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `

  return rows.length > 0 ? (rows[0] as { id: string }) : null
}

export async function markNewsletterSent(id: string): Promise<boolean> {
  const rows = await sql`
    UPDATE public.posts
    SET newsletter_sent_at = now(), updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `

  return rows.length > 0
}

export async function deletePost(id: string): Promise<string | null> {
  const rows = await sql`
    DELETE FROM public.posts
    WHERE id = ${id}
    RETURNING id
  `

  return rows.length > 0 ? (rows[0].id as string) : null
}