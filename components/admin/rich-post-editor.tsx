"use client"

import { useEffect, useState } from "react"
import { EditorContent, Node, mergeAttributes, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { AlignCenter, AlignLeft, AlignRight, Bold, ImagePlus, Instagram, Italic, Link as LinkIcon, Underline as UnderlineIcon } from "lucide-react"
import { isHttpsUrl, isInstagramUrl } from "@/lib/content/inline-images"

const InstagramEmbed = Node.create({
  name: "instagramEmbed",
  group: "block",
  atom: true,
  addAttributes() {
    return { url: { default: "" } }
  },
  parseHTML() {
    return [{ tag: "div[data-instagram-url]" }]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-instagram-url": HTMLAttributes.url }),
      [
        "blockquote",
        {
          class: "instagram-media",
          "data-instgrm-permalink": HTMLAttributes.url,
          "data-instgrm-version": "14",
        },
        ["a", { href: HTMLAttributes.url, target: "_blank", rel: "noreferrer" }, "View this post on Instagram"],
      ],
    ]
  },
  addNodeView() {
    return ({ node }) => {
      const element = document.createElement("div")
      element.className = "my-4 rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground"
      element.textContent = `Instagram: ${node.attrs.url}`
      return { dom: element }
    }
  },
})

interface RichPostEditorProps {
  value: string
  onChange: (value: string) => void
}

const buttonClass = "inline-flex h-8 w-8 items-center justify-center rounded border border-transparent text-muted-foreground hover:border-border hover:text-foreground disabled:opacity-50"

export function RichPostEditor({ value, onChange }: RichPostEditorProps) {
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [instagramUrl, setInstagramUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ allowBase64: false }),
      Link.configure({ openOnClick: false, protocols: ["https"] }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      InstagramEmbed,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-72 rounded-b-md border border-t-0 border-input bg-background px-3 py-3 text-sm focus:outline-none prose prose-sm dark:prose-invert max-w-none",
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false })
  }, [editor, value])

  if (!editor) return <div className="min-h-72 rounded-md border border-input bg-background" />
  const currentEditor = editor

  function addImage(url: string) {
    if (!isHttpsUrl(url)) {
      setError("Image URL must use HTTPS.")
      return
    }
    currentEditor.chain().focus().setImage({ src: url }).run()
    setImageUrl("")
    setError(null)
    setShowImageOptions(false)
  }

  async function uploadImage() {
    if (!imageFile) {
      setError("Choose an image to upload.")
      return
    }

    setUploading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/images/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: imageFile.type, size: imageFile.size }),
      })
      const presign = await response.json()
      if (!response.ok) throw new Error(presign.error || "Unable to prepare image upload")

      const upload = await fetch(presign.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      })
      if (!upload.ok) throw new Error("Image upload failed")
      addImage(presign.publicUrl)
      setImageFile(null)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed")
    } finally {
      setUploading(false)
    }
  }

  function addInstagram() {
    if (!isInstagramUrl(instagramUrl.trim())) {
      setError("Use an Instagram /p/ or /reel/ URL.")
      return
    }
    currentEditor.chain().focus().insertContent({ type: "instagramEmbed", attrs: { url: instagramUrl.trim() } }).run()
    setInstagramUrl("")
    setError(null)
  }

  return (
    <div className="rounded-md">
      <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input bg-muted/30 p-2">
        <button type="button" title="Bold" aria-label="Bold" className={buttonClass} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></button>
        <button type="button" title="Italic" aria-label="Italic" className={buttonClass} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></button>
        <button type="button" title="Underline" aria-label="Underline" className={buttonClass} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></button>
        <select aria-label="Text style" className="h-8 rounded border border-input bg-background px-2 text-xs" value={editor.isActive("heading", { level: 1 }) ? "h1" : editor.isActive("heading", { level: 2 }) ? "h2" : "p"} onChange={(event) => { const value = event.target.value; if (value === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run(); else if (value === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run(); else editor.chain().focus().setParagraph().run() }}>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
        </select>
        <button type="button" title="Blockquote" aria-label="Blockquote" className={buttonClass} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“</button>
        <button type="button" title="Link" aria-label="Link" className={buttonClass} onClick={() => { const url = window.prompt("HTTPS link URL"); if (url && isHttpsUrl(url)) editor.chain().focus().setLink({ href: url }).run() }}><LinkIcon size={16} /></button>
        <button type="button" title="Align left" aria-label="Align left" className={buttonClass} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></button>
        <button type="button" title="Align center" aria-label="Align center" className={buttonClass} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></button>
        <button type="button" title="Align right" aria-label="Align right" className={buttonClass} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></button>
        <button type="button" title="Image" aria-label="Image" className={`${buttonClass} ${showImageOptions ? "border-border text-foreground" : ""}`} onClick={() => setShowImageOptions((open) => !open)}><ImagePlus size={16} /></button>
        <button type="button" title="Instagram" aria-label="Instagram" className={buttonClass} onClick={() => document.getElementById("instagram-url")?.focus()}><Instagram size={16} /></button>
      </div>
      {showImageOptions && (
        <div className="space-y-2 border-x border-input bg-muted/10 p-3">
          <div className="flex flex-wrap gap-2">
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} disabled={uploading} className="max-w-full text-sm" />
            <button type="button" onClick={uploadImage} disabled={uploading} className="rounded bg-secondary px-3 py-1 text-sm disabled:opacity-50">{uploading ? "Uploading..." : "Upload file"}</button>
          </div>
          <div className="flex gap-2">
            <input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Paste HTTPS image URL" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm" />
            <button type="button" onClick={() => addImage(imageUrl.trim())} disabled={!imageUrl.trim()} className="rounded bg-secondary px-3 py-1 text-sm disabled:opacity-50">Insert URL</button>
          </div>
        </div>
      )}
      <div className="flex gap-2 border-x border-b border-input bg-muted/10 p-3">
        <input id="instagram-url" type="url" value={instagramUrl} onChange={(event) => setInstagramUrl(event.target.value)} placeholder="Paste Instagram /p/ or /reel/ URL" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm" />
        <button type="button" onClick={addInstagram} disabled={!instagramUrl.trim()} className="rounded bg-secondary px-3 py-1 text-sm disabled:opacity-50">Insert Instagram</button>
      </div>
      {error && <p className="border-x border-b border-input px-3 py-2 text-sm text-destructive">{error}</p>}
      <EditorContent editor={editor} />
    </div>
  )
}