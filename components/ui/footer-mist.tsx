"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[420px]"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 35%, transparent 100%)",
        }}
      >
        {/* LIGHT MODE — CLEAN, EVEN GOLD FIELD */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-60px] left-[-20%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 230, 140, 0.10)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] left-[15%] h-[340px] w-[50%] rounded-full"
            style={{
              background: "rgba(255, 235, 160, 0.09)",
              filter: "blur(150px)",
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-18%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 225, 130, 0.08)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[25%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 245, 200, 0.07)",
              filter: "blur(120px)",
            }}
          />
        </div>

        {/* DARK MODE — CELESTIAL (NOT SMOKY) */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-60px] left-[-20%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 235, 200, 0.12)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] left-[15%] h-[340px] w-[50%] rounded-full"
            style={{
              background: "rgba(255, 245, 215, 0.10)",
              filter: "blur(150px)",
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-18%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 240, 210, 0.09)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[25%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 250, 230, 0.08)",
              filter: "blur(120px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
