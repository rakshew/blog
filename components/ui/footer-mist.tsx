export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
    >
      {/* Light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute left-1/2 bottom-[-60px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            width: "70%",
            height: "260px",
            background:
              "radial-gradient(ellipse at center, rgba(255, 228, 150, 0.18) 0%, rgba(255, 228, 150, 0.10) 35%, rgba(255, 228, 150, 0.00) 75%)",
          }}
        />
      </div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute left-1/2 bottom-[-60px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            width: "70%",
            height: "260px",
            background:
              "radial-gradient(ellipse at center, rgba(255, 239, 205, 0.16) 0%, rgba(255, 239, 205, 0.08) 35%, rgba(255, 239, 205, 0.00) 75%)",
          }}
        />
      </div>
    </div>
  )
}
