"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[380px]"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 42%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 42%, transparent 100%)",
        }}
      >
        {/* Light mode */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-10px] left-[-8%] h-[230px] w-[58%] rounded-full"
            style={{
              background: "rgba(160, 118, 52, 0.16)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-[0px] right-[-6%] h-[250px] w-[54%] rounded-full"
            style={{
              background: "rgba(196, 154, 84, 0.15)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-[18px] left-[24%] h-[175px] w-[36%] rounded-full"
            style={{
              background: "rgba(224, 190, 120, 0.11)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-20px] left-[-8%] h-[220px] w-[58%] rounded-full"
            style={{
              background: "rgba(255, 244, 224, 0.11)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute bottom-[-10px] right-[-6%] h-[240px] w-[54%] rounded-full"
            style={{
              background
