export type AccentColor = 'coral' | 'sage' | 'ocean' | 'lavender' | 'amber' | 'slate'

export const ACCENT_COLORS: { value: AccentColor; label: string; color: string }[] = [
  { value: 'coral', label: 'Coral', color: '#E07A5F' },
  { value: 'sage', label: 'Sage', color: '#6B8E6B' },
  { value: 'ocean', label: 'Ocean', color: '#4A90A4' },
  { value: 'lavender', label: 'Lavender', color: '#9B8AA6' },
  { value: 'amber', label: 'Amber', color: '#D4A853' },
  { value: 'slate', label: 'Slate', color: '#6B7280' },
]

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  tags: string[]
  status: "draft" | "published"
  accent: AccentColor
  is_poetry: boolean
  created_at: string
  updated_at: string
  published_at: string | null
}
