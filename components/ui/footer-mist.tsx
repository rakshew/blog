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
          maskImage: "linear-gradient(to top, black 38%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 38%, transparent 100%)",
        }}
      >
        {/* Light theme: luminous champagne / ivory heaven glow */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-30px] left-[-10%] h-[250px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 244, 214, 0.22)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-[-20px] right-[-8%] h-[280px] w-[56%] rounded-full"
            style={{
              background: "rgba(255, 236, 196, 0.18)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[24%] h-[190px] w-[38%] rounded-full"
            style={{
              background: "rgba(255, 250, 232, 0.16)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-[40px] left-[35%] h-[120px] w-[22%] rounded-full"
            style={{
              background: "rgba(255, 255, 245, 0.14)",
              filter: "blur(70px)",
            }}
          />
        </div>

        {/* Dark theme: cream / celestial glow */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-30px] left-[-10%] h-[250px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 245, 220, 0.18)",
              filter: "blur(105px)",
            }}
          />
          <div
            className="absolute bottom-[-20px] right-[-8%] h-[280px] w-[56%] rounded-full"
            style={{
              background: "rgba(255, 238, 210, 0.15)",
              filter: "blur(115px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[24%] h-[190px] w-[38%] rounded-full"
            style={{
              background: "rgba(255, 250, 235, 0.12)",
              filter: "blur(95px)",
            }}
          />
          <div
            className="absolute bottom-[40px] left-[35%] h-[120px] w-[22%] rounded-full"
            style={{
              background: "rgba(255, 255, 245, 0.10)",
              filter: "blur(75px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
