export type InlineImage = {
  url: string
  alt: string
  caption: string
}

export type PostContentSegment =
  | { type: "text"; value: string }
  | { type: "image"; value: InlineImage }
  | { type: "instagram"; value: string }

const markerPattern = /\[\[(inline-image|instagram):([^\]]*)\]\]/g

export function createInlineImageMarker(image: InlineImage) {
  return `[[inline-image:${encodeURIComponent(JSON.stringify(image))}]]`
}

export function parseInlineImageMarker(value: string): InlineImage | null {
  try {
    const image = JSON.parse(decodeURIComponent(value)) as Partial<InlineImage>
    if (typeof image.url !== "string" || !image.url) return null

    return {
      url: image.url,
      alt: typeof image.alt === "string" ? image.alt : "",
      caption: typeof image.caption === "string" ? image.caption : "",
    }
  } catch {
    return null
  }
}

export function createInstagramMarker(url: string) {
  return `[[instagram:${encodeURIComponent(url)}]]`
}

export function parseInstagramMarker(value: string) {
  try {
    const url = decodeURIComponent(value)
    return isInstagramUrl(url) ? url : null
  } catch {
    return null
  }
}

export function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

export function isInstagramUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && (url.hostname === "instagram.com" || url.hostname === "www.instagram.com") && /^\/(p|reel)\/[^/]+\/?$/i.test(url.pathname)
  } catch {
    return false
  }
}

export function parseInlinePostContent(content: string): PostContentSegment[] {
  const segments: PostContentSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  markerPattern.lastIndex = 0

  while ((match = markerPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: content.slice(lastIndex, match.index) })
    }

    const image = match[1] === "inline-image" ? parseInlineImageMarker(match[2]) : null
    const instagramUrl = match[1] === "instagram" ? parseInstagramMarker(match[2]) : null
    if (image) {
      segments.push({ type: "image", value: image })
    } else if (instagramUrl) {
      segments.push({ type: "instagram", value: instagramUrl })
    } else {
      segments.push({ type: "text", value: match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: "text", value: content }]
}

export function hasInlineImageMarker(content: string) {
  markerPattern.lastIndex = 0
  const result = markerPattern.test(content)
  markerPattern.lastIndex = 0
  return result
}