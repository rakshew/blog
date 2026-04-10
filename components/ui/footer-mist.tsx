export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[260px] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 18%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 18%, transparent 100%)",
        }}
      >
        {/* Light mode */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-70px] left-[-12%] h-[190px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 226, 135, 0.10)",
              filter: "blur(105px)",
            }}
          />
          <div
            className="absolute bottom-[-85px] left-[26%] h-[210px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 238, 180, 0.10)",
              filter: "blur(115px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] right-[-12%] h-[190px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 220, 120, 0.09)",
              filter: "blur(105px)",
            }}
          />
        </div>

        {/* Dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-70px] left-[-12%] h-[190px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 236, 198, 0.11)",
              filter: "blur(105px)",
            }}
          />
          <div
            className="absolute bottom-[-85px] left-[26%] h-[210px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 244, 220, 0.10)",
              filter: "blur(115px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] right-[-12%] h-[190px] w-[48%] rounded-full"
            style={{
              background: "rgba(255, 238, 205, 0.09)",
              filter: "blur(105px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
