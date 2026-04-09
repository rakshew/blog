"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[400px]"
    >
      {/* Vertical fade to remove hard edge */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 40%, transparent 100%)",
        }}
      >
        {/* LIGHT MODE — STRONG GOLD */}
        <div className="absolute inset-0 dark:hidden">
          {/* Deep gold base */}
          <div
            className="absolute bottom-[-10px] left-[-10%] h-[260px] w-[60%] rounded-full"
            style={{
              background: "rgba(184, 134, 11, 0.28)", // dark gold
              filter: "blur(100px)",
            }}
          />

          {/* Rich amber layer */}
          <div
            className="absolute bottom-[-20px] right-[-8%] h-[280px] w-[55%] rounded-full"
            style={{
              background: "rgba(218, 165, 32, 0.24)", // goldenrod
              filter: "blur(110px)",
            }}
          />

          {/* Bright gold highlight */}
          <div
            className="absolute bottom-[20px] left-[25%] h-[200px] w-[40%] rounded-full"
            style={{
              background: "rgba(255, 215, 0, 0.18)", // bright gold
              filter: "blur(90px)",
            }}
          />

          {/* Soft glow top layer */}
          <div
            className="absolute bottom-[60px] left-[35%] h-[140px] w-[30%] rounded-full"
            style={{
              background: "rgba(255, 230, 150, 0.14)",
              filter: "blur(70px)",
            }}
          />
        </div>

        {/* DARK MODE — KEEP CLEAN CREAM */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-10px] left-[-10%] h-[260px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 244, 224, 0.16)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-[-20px] right-[-8%] h-[280px] w-[55%] rounded-full"
            style={{
              background: "rgba(255, 236, 204, 0.14)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute bottom-[20px] left-[25%] h-[200px] w-[40%] rounded-full"
            style={{
              background: "rgba(255, 248, 230, 0.10)",
              filter: "blur(90px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
