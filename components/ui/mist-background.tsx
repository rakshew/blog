"use client"

export function MistBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Light mode mist (cream background → slightly darker haze) */}
      <div
        className="absolute inset-0 opacity-60 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 25%, rgba(120,113,108,0.12), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(168,162,158,0.10), transparent 32%),
            radial-gradient(circle at 35% 75%, rgba(120,113,108,0.08), transparent 28%),
            radial-gradient(circle at 75% 80%, rgba(168,162,158,0.08), transparent 30%)
          `,
          filter: "blur(70px)",
        }}
      />

      {/* Dark mode mist (charcoal background → soft white haze) */}
      <div
        className="absolute inset-0 opacity-40 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at 20% 25%, rgba(255,255,255,0.10), transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 32%),
            radial-gradient(circle at 35% 75%, rgba(255,255,255,0.06), transparent 28%),
            radial-gradient(circle at 75% 80%, rgba(255,255,255,0.06), transparent 30%)
          `,
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
