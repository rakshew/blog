"use client"

import { useState } from "react"
import { PersonStanding } from "lucide-react"
import { useAccessibility } from "./accessibility-provider"

export function AccessibilityToggle() {
  const [open, setOpen] = useState(false)
  const { settings, toggleSetting } = useAccessibility()

  return (
    <div className="relative">
      {/* Icon button */}
      <button
        type="button"
        aria-label="Accessibility settings"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="hover:opacity-70 transition-opacity"
        title="Accessibility"
      >
        <PersonStanding
          className="h-[1.2rem] w-[1.2rem]"
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-md border border-border bg-background shadow-lg p-4 z-50">
          <div className="space-y-3">
            <p className="font-medium text-sm">Accessibility</p>

            <button
              type="button"
              onClick={() => toggleSetting("dyslexicMode")}
              className="w-full text-left px-3 py-2 rounded border border-border text-sm hover:opacity-80 transition-opacity"
            >
              {settings.dyslexicMode
                ? "Disable dyslexic mode"
                : "Enable dyslexic mode"}
            </button>

            <button
              type="button"
              onClick={() => toggleSetting("largeText")}
              className="w-full text-left px-3 py-2 rounded border border-border text-sm hover:opacity-80 transition-opacity"
            >
              {settings.largeText
                ? "Disable larger text"
                : "Enable larger text"}
            </button>

            <button
              type="button"
              onClick={() => toggleSetting("extraSpacing")}
              className="w-full text-left px-3 py-2 rounded border border-border text-sm hover:opacity-80 transition-opacity"
            >
              {settings.extraSpacing
                ? "Disable extra spacing"
                : "Enable extra spacing"}
            </button>

            <button
              type="button"
              onClick={() => toggleSetting("highContrast")}
              className="w-full text-left px-3 py-2 rounded border border-border text-sm hover:opacity-80 transition-opacity"
            >
              {settings.highContrast
                ? "Disable high contrast"
                : "Enable high contrast"}
            </button>

            <button
              type="button"
              onClick={() => toggleSetting("reduceMotion")}
              className="w-full text-left px-3 py-2 rounded border border-border text-sm hover:opacity-80 transition-opacity"
            >
              {settings.reduceMotion
                ? "Disable reduced motion"
                : "Enable reduced motion"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
