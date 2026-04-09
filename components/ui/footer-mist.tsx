"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] overflow-hidden"
    >
      {/* Light mode → warm gold haze over cream */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute bottom-[-80px] left-[-10%] h-[240px] w-[60%] rounded-full blur-3xl"
          style={{ background: "rgba(214, 188, 141, 0.18)" }} // soft gold
        />
        <div
          className="absolute bottom-[-100px] right-[-8%] h-[260px] w-[55%] rounded-full blur-3xl"
          style={{ background: "rgba(200, 170, 120, 0.14)" }}
        />
        <div
          className="absolute bottom-[-60px] left-[25%] h-[180px] w-[40%] rounded-full blur-3xl"
          style={{ background: "rgba(180, 150, 100, 0.08)" }}
        />
      </div>

      {/* Dark mode → cream mist over charcoal */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute bottom-[-80px] left-[-10%] h-[240px] w-[60%] rounded-full blur-3xl"
          style={{ background: "rgba(255, 248, 230, 0.14)" }}
        />
        <div
          className="absolute bottom-[-100px] right-[-8%] h-[260px] w-[55%] rounded-full blur-3xl"
          style={{ background: "rgba(255, 245, 220, 0.12)" }}
        />
        <div
          className="absolute bottom-[-60px] left-[25%] h-[180px] w-[40%] rounded-full blur-3xl"
          style={{ background: "rgba(255, 240, 210, 0.08)" }}
        />
      </div>
    </div>
  )
}
