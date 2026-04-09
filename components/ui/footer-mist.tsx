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
        {/* LIGHT MODE — divine gold radiance */}
        <div className="absolute inset-0 dark:hidden">
          {/* outer haze */}
          <div
            className="absolute bottom-[-30px] left-[-12%] h-[260px] w-[62%] rounded-full"
            style={{
              background: "rgba(210, 165, 85, 0.18)",
              filter: "blur(120px)",
            }}
          />

          {/* mid glow */}
          <div
            className="absolute bottom-[-10px] right-[-10%] h-[300px] w-[58%] rounded-full"
            style={{
              background: "rgba(235, 195, 120, 0.20)",
              filter: "blur(130px)",
            }}
          />

          {/* inner warm light */}
          <div
            className="absolute bottom-[10px] left-[26%] h-[200px] w-[40%] rounded-full"
            style={{
              background: "rgba(255, 225, 160, 0.22)",
              filter: "blur(110px)",
            }}
          />

          {/* divine highlight (key layer) */}
          <div
            className="absolute bottom-[40px] left-[38%] h-[120px] w-[22%] rounded-full"
            style={{
              background: "rgba(255, 245, 210, 0.25)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* DARK MODE — celestial cream glow */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-30px] left-[-12%] h-[260px] w-[62%] rounded-full"
            style={{
              background: "rgba(255, 240, 210, 0.16)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute bottom-[-10px] right-[-10%] h-[300px] w-[58%] rounded-full"
            style={{
              background: "rgba(255, 235, 200, 0.14)",
              filter: "blur(130px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[26%] h-[200px] w-[40%] rounded-full"
            style={{
              background: "rgba(255, 245, 220, 0.12)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute bottom-[40px] left-[38%] h-[120px] w-[22%] rounded-full"
            style={{
              background: "rgba(255, 250, 230, 0.12)",
              filter: "blur(80px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
