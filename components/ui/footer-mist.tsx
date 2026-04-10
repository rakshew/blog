export function FooterMist() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 20%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-40px] left-[-15%] h-[180px] w-[55%] rounded-full"
            style={{
              background: "rgba(255, 228, 135, 0.12)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute bottom-[-45px] left-[20%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 236, 170, 0.10)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute bottom-[-40px] right-[-15%] h-[180px] w-[55%] rounded-full"
            style={{
              background: "rgba(255, 221, 120, 0.09)",
              filter: "blur(110px)",
            }}
          />
        </div>

        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-40px] left-[-15%] h-[180px] w-[55%] rounded-full"
            style={{
              background: "rgba(255, 238, 205, 0.13)",
              filter: "blur(110px)",
            }}
          />
          <div
            className="absolute bottom-[-45px] left-[20%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 246, 220, 0.11)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute bottom-[-40px] right-[-15%] h-[180px] w-[55%] rounded-full"
            style={{
              background: "rgba(255, 241, 214, 0.10)",
              filter: "blur(110px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
