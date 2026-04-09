"use client"

export function FooterMist() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[420px] overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to top, black 32%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 32%, transparent 100%)",
        }}
      >
        {/* Light theme: luminous champagne haze */}
        <div className="absolute inset-0 dark:hidden">
          <div className="footer-mist footer-mist-light-1" />
          <div className="footer-mist footer-mist-light-2" />
          <div className="footer-mist footer-mist-light-3" />
          <div className="footer-mist footer-mist-light-core" />
        </div>

        {/* Dark theme: cream divine glow */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="footer-mist footer-mist-dark-1" />
          <div className="footer-mist footer-mist-dark-2" />
          <div className="footer-mist footer-mist-dark-3" />
          <div className="footer-mist footer-mist-dark-core" />
        </div>
      </div>

      <style jsx>{`
        .footer-mist {
          position: absolute;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation-duration: 14s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .footer-mist-light-1 {
          left: -10%;
          bottom: -24px;
          width: 62%;
          height: 250px;
          background: rgba(255, 225, 168, 0.16);
          filter: blur(110px);
          animation-name: driftA;
        }

        .footer-mist-light-2 {
          right: -10%;
          bottom: -10px;
          width: 58%;
          height: 285px;
          background: rgba(255, 236, 196, 0.18);
          filter: blur(120px);
          animation-name: driftB;
        }

        .footer-mist-light-3 {
          left: 24%;
          bottom: 18px;
          width: 40%;
          height: 190px;
          background: rgba(255, 244, 214, 0.16);
          filter: blur(95px);
          animation-name: driftC;
        }

        .footer-mist-light-core {
          left: 38%;
          bottom: 52px;
          width: 22%;
          height: 120px;
          background: rgba(255, 250, 235, 0.22);
          filter: blur(70px);
          animation-name: pulseGlow;
        }

        .footer-mist-dark-1 {
          left: -10%;
          bottom: -24px;
          width: 62%;
          height: 250px;
          background: rgba(255, 242, 218, 0.13);
          filter: blur(110px);
          animation-name: driftA;
        }

        .footer-mist-dark-2 {
          right: -10%;
          bottom: -10px;
          width: 58%;
          height: 285px;
          background: rgba(255, 236, 210, 0.14);
          filter: blur(120px);
          animation-name: driftB;
        }

        .footer-mist-dark-3 {
          left: 24%;
          bottom: 18px;
          width: 40%;
          height: 190px;
          background: rgba(255, 248, 228, 0.11);
          filter: blur(95px);
          animation-name: driftC;
        }

        .footer-mist-dark-core {
          left: 38%;
          bottom: 52px;
          width: 22%;
          height: 120px;
          background: rgba(255, 252, 240, 0.14);
          filter: blur(70px);
          animation-name: pulseGlow;
        }

        @keyframes driftA {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(18px, -8px, 0);
          }
        }

        @keyframes driftB {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-16px, -10px, 0);
          }
        }

        @keyframes driftC {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(10px, -6px, 0);
          }
        }

        @keyframes pulseGlow {
          from {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.9;
          }
          to {
            transform: translate3d(0, -4px, 0) scale(1.04);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
