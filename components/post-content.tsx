"use client"

import { useEffect } from "react"
import {
  hasInlineImageMarker,
  parseInlinePostContent,
} from "@/lib/content/inline-images"

type PostContentProps = {
  content: string
  isPoetry: boolean
}

function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content)
}

export function PostContent({ content, isPoetry }: PostContentProps) {
  const contentClassName = isPoetry
    ? "mt-10 font-serif text-lg leading-loose"
    : "mt-10 prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed"

  useEffect(() => {
    if (!content.includes("instagram-media")) return

    const processEmbeds = () => {
      const instagram = (window as Window & { instgrm?: { Embeds?: { process: () => void } } }).instgrm
      instagram?.Embeds?.process()
    }
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    if (existingScript) {
      processEmbeds()
      return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.instagram.com/embed.js"
    script.onload = processEmbeds
    document.body.appendChild(script)
  }, [content])

  if (looksLikeHtml(content) && !hasInlineImageMarker(content)) {
    return (
      <div
        className={contentClassName}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className={`${contentClassName} whitespace-pre-wrap break-words`}>
      {parseInlinePostContent(content).map((segment, index) => {
        if (segment.type === "text") {
          return <span key={`text-${index}`}>{segment.value}</span>
        }

        if (segment.type === "instagram") {
          return (
            <div key={`instagram-${index}`} className="my-8 not-prose">
              <blockquote className="instagram-media" data-instgrm-permalink={segment.value} data-instgrm-version="14">
                <a href={segment.value} target="_blank" rel="noreferrer">View this post on Instagram</a>
              </blockquote>
              <script async src="https://www.instagram.com/embed.js" />
            </div>
          )
        }

        return (
          <figure key={`image-${index}`} className="my-8 not-prose">
            <img
              src={segment.value.url}
              alt={segment.value.alt || ""}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-md"
            />
            {segment.value.caption && (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {segment.value.caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}