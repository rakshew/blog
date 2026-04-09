"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 h-[340px] z-0 overflow-hidden"
    >
      {/* Light mode */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute bottom-[10px] left-[-8%] h-[220px] w-[58%] rounded-full"
          style={{
            background: "rgba(186, 146, 78, 0.16)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-[0px] right-[-6%] h-[240px] w-[54%] rounded-full"
          style={{
            background: "rgba(214, 188, 141, 0.18)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[30px] left-[24%] h-[160px] w-[36%] rounded-full"
          style={{
            background: "rgba(255, 232, 186, 0.12)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute bottom-[10px] left-[-8%] h-[220px] w-[58%] rounded-full"
          style={{
            background: "rgba(255, 244, 224, 0.20)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-[0px] right-[-6%] h-[240px] w-[54%] rounded-full"
          style={{
            background: "rgba(255, 236, 204, 0.18)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[30px] left-[24%] h-[160px] w-[36%] rounded-full"
          style={{
            background: "rgba(255, 248, 230, 0.12)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </div>
  )
}
