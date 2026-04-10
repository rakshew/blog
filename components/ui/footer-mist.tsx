export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px]"
      style={{
        maskImage: "linear-gradient(to top, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, black 0%, black 55%, transparent 100%)",
      }}
    >
      {/* light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute left-1/2 bottom-[-55px] -translate-x-1/2 rounded-full blur-[115px]"
          style={{
            width: "72%",
            height: "220px",
            background:
              "radial-gradient(ellipse at center, rgba(255,228,150,0.16) 0%, rgba(255,228,150,0.10) 36%, rgba(255,228,150,0.00) 78%)",
          }}
        />
        <div
          className="absolute left-1/2 bottom-[-72px] -translate-x-1/2 rounded-full blur-[145px]"
          style={{
            width: "88%",
            height: "250px",
            background:
              "radial-gradient(ellipse at center, rgba(255,214,120,0.08) 0%, rgba(255,214,120,0.04) 42%, rgba(255,214,120,0.00) 82%)",
          }}
        />
      </div>

      {/* dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute left-1/2 bottom-[-55px] -translate-x-1/2 rounded-full blur-[115px]"
          style={{
            width: "72%",
            height: "220px",
            background:
              "radial-gradient(ellipse at center, rgba(255,239,205,0.15) 0%, rgba(255,239,205,0.08) 36%, rgba(255,239,205,0.00) 78%)",
          }}
        />
        <div
          className="absolute left-1/2 bottom-[-72px] -translate-x-1/2 rounded-full blur-[145px]"
          style={{
            width: "88%",
            height: "250px",
            background:
              "radial-gradient(ellipse at center, rgba(255,228,180,0.07) 0%, rgba(255,228,180,0.035) 42%, rgba(255,228,180,0.00) 82%)",
          }}
        />
      </div>
    </div>
  )
}
