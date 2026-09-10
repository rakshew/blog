"use client"

import { useEffect, useRef, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { Extension, Node, mergeAttributes } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"

type RichPostEditorProps = {
  value: string
  onChange: (value: string) => void
  isPoetry: boolean
  onPoetryChange: (value: boolean) => void
}

const Indent = Extension.create({
  name: "indent",
  addGlobalAttributes() {
    return [{
      types: ["paragraph", "heading"],
      attributes: {
        indent: {
          default: 0,
          parseHTML: (element: HTMLElement) => {
            const value = Number(element.getAttribute("data-indent") || 0)
            return Number.isFinite(value) ? Math.min(6, Math.max(0, value)) : 0
          },
          renderHTML: (attributes: { indent?: number }) => {
            const indent = Number(attributes.indent || 0)
            return indent ? { "data-indent": String(indent) } : {}
          },
        },
      },
    }]
  },
})

const InstagramEmbed = Node.create({
  name: "instagramEmbed",
  group: "block",
  atom: true,
  addAttributes() {
    return { url: { default: null } }
  },
  parseHTML() {
    return [{
      tag: "div[data-instagram-embed]",
      getAttrs: (element: HTMLElement) => ({ url: element.dataset.instagramUrl || null }),
    }]
  },
  renderHTML({ HTMLAttributes }) {
    const url = String(HTMLAttributes.url || "")
    return [
      "div",
      mergeAttributes({ "data-instagram-embed": "true", "data-instagram-url": url, class: "instagram-embed-shell" }),
      ["blockquote", { class: "instagram-media", "data-instgrm-permalink": url, "data-instgrm-version": "14" }, ["a", { href: url, target: "_blank", rel: "noopener noreferrer" }, "View this post on Instagram"]],
    ]
  },
})

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
}

function normalizeInitialContent(value: string) {
  if (!value) return "<p></p>"
  if (/<[a-z][\s\S]*>/i.test(value)) return value
  return value.split(/\n\n+/).map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`).join("")
}

function isInstagramUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && (url.hostname === "instagram.com" || url.hostname === "www.instagram.com") && (url.pathname.startsWith("/p/") || url.pathname.startsWith("/reel/"))
  } catch {
    return false
  }
}

export function RichPostEditor({ value, onChange, isPoetry, onPoetryChange }: RichPostEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const savedImagePosition = useRef<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      Image.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "blog-inline-image" } }),
      TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right", "justify"] }),
      TextStyleKit,
      Indent,
      InstagramEmbed,
    ],
    content: normalizeInitialContent(value),
    editorProps: { attributes: { class: "min-h-[420px] px-4 py-4 focus:outline-none prose dark:prose-invert max-w-none" } },
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
  })

  useEffect(() => {
    if (!editor) return
    const incoming = normalizeInitialContent(value)
    if (editor.getHTML() !== incoming) editor.commands.setContent(incoming, { emitUpdate: false })
  }, [editor, value])

  if (!editor) return null
  const currentEditor = editor

  const buttonClass = (active = false) => ["px-2.5 py-1.5 rounded text-sm border transition-colors", active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"].join(" ")

  function applyIndent(delta: number) {
    const nodeType = currentEditor.isActive("heading") ? "heading" : "paragraph"
    const current = Number(currentEditor.getAttributes(nodeType).indent || 0)
    currentEditor.chain().focus().updateAttributes(nodeType, { indent: Math.max(0, Math.min(6, current + delta)) }).run()
  }

  function setLink() {
    const href = window.prompt("Link URL", currentEditor.getAttributes("link").href || "")
    if (href === null) return
    const chain = currentEditor.chain().focus().extendMarkRange("link")
    if (!href.trim()) chain.unsetLink().run()
    else chain.setLink({ href: href.trim() }).run()
  }

  async function uploadImage(file: File) {
    setError(null)
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) return setError("Use JPEG, PNG, WebP, or AVIF.")
    if (file.size > 8 * 1024 * 1024) return setError("Image must be 8 MB or smaller.")
    setUploading(true)
    try {
      const presignResponse = await fetch("/api/admin/images/presign", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contentType: file.type, size: file.size }) })
      const presign = await presignResponse.json()
      if (!presignResponse.ok) throw new Error(presign.error || "Unable to prepare image upload")
      const uploadResponse = await fetch(presign.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file })
      if (!uploadResponse.ok) throw new Error("Image upload failed")
      const position = savedImagePosition.current ?? currentEditor.state.selection.from
      currentEditor.chain().focus().setTextSelection(position).setImage({ src: presign.publicUrl }).run()
      savedImagePosition.current = null
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed")
    } finally {
      setUploading(false)
      if (imageInputRef.current) imageInputRef.current.value = ""
    }
  }

  function insertImageUrl() {
    const position = currentEditor.state.selection.from
    const source = window.prompt("Paste HTTPS image URL")
    if (!source) return
    try {
      if (new URL(source.trim()).protocol !== "https:") return setError("Image URL must use HTTPS.")
    } catch {
      return setError("Enter a valid image URL.")
    }
    const alt = window.prompt("Alt text (optional)") || ""
    currentEditor.chain().focus().setTextSelection(position).setImage({ src: source.trim(), alt }).run()
  }

  function insertInstagram() {
    const position = currentEditor.state.selection.from
    const source = window.prompt("Paste Instagram post or reel URL")
    if (!source) return
    const url = source.trim()
    if (!isInstagramUrl(url)) return setError("Use a public Instagram post or reel URL.")
    currentEditor.chain().focus().setTextSelection(position).insertContent({ type: "instagramEmbed", attrs: { url } }).run()
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-t-md border border-border bg-muted/30 p-2">
        <button type="button" className={buttonClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button type="button" className={buttonClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button type="button" className={buttonClass(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <select aria-label="Paragraph style" className="rounded border border-border bg-background px-2 py-1 text-sm" value={editor.isActive("heading", { level: 1 }) ? "h1" : editor.isActive("heading", { level: 2 }) ? "h2" : editor.isActive("blockquote") ? "quote" : "p"} onChange={(event) => { const choice = event.target.value; if (choice === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run(); else if (choice === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run(); else if (choice === "quote") editor.chain().focus().toggleBlockquote().run(); else editor.chain().focus().setParagraph().run() }}>
          <option value="p">Paragraph</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="quote">Quote</option>
        </select>
        <select aria-label="Font family" className="rounded border border-border bg-background px-2 py-1 text-sm" defaultValue="" onChange={(event) => event.target.value ? editor.chain().focus().setFontFamily(event.target.value).run() : editor.chain().focus().unsetFontFamily().run()}>
          <option value="">Default font</option><option value="Georgia, serif">Georgia</option><option value="'Times New Roman', serif">Times New Roman</option><option value="Arial, sans-serif">Arial</option><option value="'Trebuchet MS', sans-serif">Trebuchet</option><option value="'Courier New', monospace">Courier</option>
        </select>
        <select aria-label="Font size" className="rounded border border-border bg-background px-2 py-1 text-sm" defaultValue="" onChange={(event) => event.target.value ? editor.chain().focus().setFontSize(event.target.value).run() : editor.chain().focus().unsetFontSize().run()}>
          <option value="">Size</option><option value="12px">12</option><option value="14px">14</option><option value="16px">16</option><option value="18px">18</option><option value="20px">20</option><option value="24px">24</option><option value="28px">28</option><option value="32px">32</option><option value="40px">40</option>
        </select>
        {(["left", "center", "right", "justify"] as const).map((alignment) => <button key={alignment} type="button" className={buttonClass(editor.isActive({ textAlign: alignment }))} onClick={() => editor.chain().focus().setTextAlign(alignment).run()}>{alignment === "center" ? "Centre" : alignment[0].toUpperCase() + alignment.slice(1)}</button>)}
        <button type="button" className={buttonClass()} onClick={() => applyIndent(-1)}>Outdent</button>
        <button type="button" className={buttonClass()} onClick={() => applyIndent(1)}>Indent</button>
        <button type="button" className={buttonClass(editor.isActive("link"))} onClick={setLink}>Link</button>
        <button type="button" className={buttonClass()} disabled={uploading} onClick={() => { savedImagePosition.current = editor.state.selection.from; imageInputRef.current?.click() }}>{uploading ? "Uploading..." : "Image"}</button>
        <button type="button" className={buttonClass()} onClick={insertImageUrl}>Image URL</button>
        <button type="button" className={buttonClass()} onClick={insertInstagram}>Instagram</button>
        <button type="button" className={buttonClass(isPoetry)} onClick={() => onPoetryChange(!isPoetry)}>Poetry</button>
      </div>
      <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file) }} />
      <div className={["rounded-b-md border border-t-0 border-border bg-background", isPoetry ? "[&_.ProseMirror]:font-serif [&_.ProseMirror]:leading-[1.9] [&_.ProseMirror_p]:my-0" : "", "[&_.ProseMirror_img]:mx-auto [&_.ProseMirror_img]:my-6 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg", "[&_[data-indent='1']]:ml-8 [&_[data-indent='2']]:ml-16 [&_[data-indent='3']]:ml-24 [&_[data-indent='4']]:ml-32 [&_[data-indent='5']]:ml-40 [&_[data-indent='6']]:ml-48"].join(" ")}>
        <EditorContent editor={editor} />
      </div>
      {isPoetry && <p className="text-xs text-muted-foreground">Poetry mode is active. Line spacing is preserved and paragraph gaps are removed.</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}