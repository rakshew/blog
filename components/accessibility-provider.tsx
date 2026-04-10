"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type AccessibilitySettings = {
  dyslexicMode: boolean
  largeText: boolean
  extraSpacing: boolean
  highContrast: boolean
  reduceMotion: boolean
}

type AccessibilityContextType = {
  settings: AccessibilitySettings
  toggleSetting: (key: keyof AccessibilitySettings) => void
  setDyslexicMode: (value: boolean) => void
}

const defaultSettings: AccessibilitySettings = {
  dyslexicMode: false,
  largeText: false,
  extraSpacing: false,
  highContrast: false,
  reduceMotion: false,
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem("rakshi-accessibility")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("rakshi-accessibility", JSON.stringify(settings))

    const root = document.documentElement

    root.classList.toggle("a11y-dyslexic", settings.dyslexicMode)
    root.classList.toggle("a11y-large-text", settings.largeText)
    root.classList.toggle("a11y-extra-spacing", settings.extraSpacing)
    root.classList.toggle("a11y-high-contrast", settings.highContrast)
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion)
  }, [settings])

  const value = useMemo(
    () => ({
      settings,
      toggleSetting: (key: keyof AccessibilitySettings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
      },
      setDyslexicMode: (value: boolean) => {
        setSettings((prev) => ({ ...prev, dyslexicMode: value }))
      },
    }),
    [settings]
  )

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
