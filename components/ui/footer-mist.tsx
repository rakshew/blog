export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[240px] overflow-hidden"
    >
      {/* Main ellipse */}
      <div
        className="absolute left-1/2 bottom-[-70px] -translate-x-1/2 rounded-full blur-[90px]"
        style={{
          width: "72%",
          height: "180px",
          background:
            "radial-gradient(ellipse at center, rgba(255, 228, 150, 0.16) 0%, rgba(255, 228, 150, 0.10) 35%, rgba(255, 228, 150, 0.00) 75%)",
        }}
      />

      {/* Soft support ellipse */}
      <div
        className="absolute left-1/2 bottom-[-85px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          width: "88%",
          height: "210px",
          background:
            "radial-gradient(ellipse at center, rgba(255, 214, 120, 0.10) 0%, rgba(255, 214, 120, 0.05) 40%, rgba(255, 214, 120, 0.00) 78%)",
        }}
      />

      {/* Dark mode tuning */}
      <div
        className="absolute left-1/2 bottom-[-70px] hidden -translate-x-1/2 rounded-full blur-[95px] dark:block"
        style={{
          width: "72%",
          height: "180px",
          background:
            "radial-gradient(ellipse at center, rgba(255, 239, 205, 0.14) 0%, rgba(255, 239, 205, 0.08) 35%, rgba(255, 239, 205, 0.00) 75%)",
        }}
      />

      <div
        className="absolute left-1/2 bottom-[-85px] hidden -translate-x-1/2 rounded-full blur-[120px] dark:block"
        style={{
          width: "88%",
          height: "210px",
          background:
            "radial-gradient(ellipse at center, rgba(255, 228, 180, 0.08) 0%, rgba(255, 228, 180, 0.04) 42%, rgba(255, 228, 180, 0.00) 78%)",
        }}
      />
    </div>
  )
}
