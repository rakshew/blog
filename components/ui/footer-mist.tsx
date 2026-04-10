export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[200px] overflow-hidden"
    >
      {/* Light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute left-1/2 bottom-[-20px] -translate-x-1/2 rounded-full blur-[80px]"
          style={{
            width: "65%",
            height: "140px",
            background:
              "radial-gradient(ellipse at center, rgba(255, 228, 150, 0.16) 0%, rgba(255, 228, 150, 0.08) 45%, rgba(255, 228, 150, 0.00) 80%)",
          }}
        />
      </div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute left-1/2 bottom-[-20px] -translate-x-1/2 rounded-full blur-[85px]"
          style={{
            width: "65%",
            height: "140px",
            background:
              "radial-gradient(ellipse at center, rgba(255, 239, 205, 0.14) 0%, rgba(255, 239, 205, 0.07) 45%, rgba(255, 239, 205, 0.00) 80%)",
          }}
        />
      </div>
    </div>
  )
}
