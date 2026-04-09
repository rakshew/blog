"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[380px]"
    >
      {/* Vertical fade to remove hard edge */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 45%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 45%, transparent 100%)",
        }}
      >
        {/* Light mode → refined golden mist */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-20px] left-[-8%] h-[220px] w-[58%] rounded-full"
            style={{
              background: "rgba(201, 162, 86, 0.16)", // base gold
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-[-10px] right-[-6%] h-[240px] w-[54%] rounded-full"
            style={{
              background: "rgba(224, 188, 120, 0.14)", // mid gold
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[24%] h-[170px] w-[36%] rounded-full"
            style={{
              background: "rgba(255, 222, 140, 0.12)", // highlight glow
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Dark mode → soft cream mist */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-20px] left-[-8%] h-[220px] w-[58%] rounded-full"
            style={{
              background: "rgba(255, 244, 224, 0.12)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-[-10px] right-[-6%] h-[240px] w-[54%] rounded-full"
            style={{
              background: "rgba(255, 236, 204, 0.10)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[24%] h-[170px] w-[36%] rounded-full"
            style={{
              background: "rgba(255, 248, 230, 0.08)",
              filter: "blur(80px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
