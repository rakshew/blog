"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[360px] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 26%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 26%, transparent 100%)",
        }}
      >
        {/* Light mode: heavenly gold radiance */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute left-1/2 bottom-[-30px] -translate-x-1/2 h-[220px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,244,210,0.34) 0%, rgba(245,214,145,0.18) 38%, rgba(245,214,145,0.06) 68%, transparent 100%)",
              filter: "blur(36px)",
            }}
          />
          <div
            className="absolute left-1/2 bottom-[18px] -translate-x-1/2 h-[120px] w-[240px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,250,232,0.30) 0%, rgba(255,236,188,0.14) 52%, transparent 100%)",
              filter: "blur(22px)",
            }}
          />
          <div
            className="absolute left-[18%] bottom-[6px] h-[140px] w-[220px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(243,210,140,0.10) 0%, transparent 72%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute right-[16%] bottom-[0px] h-[150px] w-[240px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(243,210,140,0.09) 0%, transparent 72%)",
              filter: "blur(32px)",
            }}
          />
        </div>

        {/* Dark mode: celestial cream-gold glow */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute left-1/2 bottom-[-28px] -translate-x-1/2 h-[230px] w-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,242,210,0.20) 0%, rgba(245,220,170,0.11) 40%, rgba(245,220,170,0.04) 70%, transparent 100%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute left-1/2 bottom-[18px] -translate-x-1/2 h-[120px] w-[250px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,248,230,0.18) 0%, rgba(255,236,198,0.09) 54%, transparent 100%)",
              filter: "blur(24px)",
            }}
          />
          <div
            className="absolute left-[20%] bottom-[6px] h-[140px] w-[240px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,220,170,0.05) 0%, transparent 74%)",
              filter: "blur(34px)",
            }}
          />
          <div
            className="absolute right-[18%] bottom-[0px] h-[150px] w-[250px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,220,170,0.05) 0%, transparent 74%)",
              filter: "blur(34px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
