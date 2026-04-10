export function FooterMist() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 35%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute bottom-[-60px] left-[-20%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 228, 135, 0.13)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] left-[15%] h-[340px] w-[50%] rounded-full"
            style={{
              background: "rgba(255, 236, 170, 0.11)",
              filter: "blur(150px)",
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-18%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 221, 120, 0.10)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[25%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 244, 205, 0.09)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="absolute inset-0 hidden dark:block">
          <div
            className="absolute bottom-[-60px] left-[-20%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 238, 205, 0.16)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[-70px] left-[15%] h-[340px] w-[50%] rounded-full"
            style={{
              background: "rgba(255, 246, 220, 0.13)",
              filter: "blur(150px)",
            }}
          />
          <div
            className="absolute bottom-[-60px] right-[-18%] h-[320px] w-[60%] rounded-full"
            style={{
              background: "rgba(255, 241, 214, 0.11)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-[10px] left-[25%] h-[200px] w-[45%] rounded-full"
            style={{
              background: "rgba(255, 250, 235, 0.10)",
              filter: "blur(120px)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
