"use client"

import { useState } from "react"
import Image from "next/image"

type OpenSection = "wise" | "dbs" | "ocbc" | null

export default function TeaPage() {
  const [openSection, setOpenSection] = useState<OpenSection>(null)

  const toggleSection = (section: OpenSection) => {
    setOpenSection((current) => (current === section ? null : section))
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-serif">
      <div className="space-y-10 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl leading-tight">டீ கடையில் நாம்</h1>
          <p className="text-lg text-muted-foreground">A Cup Between Us</p>
        </div>

        <div className="space-y-6 text-[1.2rem] leading-[1.9]">
          <p>
            “<em>Anna</em>, two tea.” The stallowner moves without hurry, the
            kettle already humming somewhere behind the counter. The atmosphere
            is calmer now, a relief from the blazing sun, filled with the sweet
            aroma of sugar and milk stirred with shrunken tea leaves. The tea is
            poured into tumblers with immediacy, the scent of spices wafting
            through the air, the cups warm in the hand, with a quiet spot found
            on the wooden bench.
          </p>

          <p className="text-xl">Patron Our Second Cup of Tea?</p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="border border-border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("wise")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-lg hover:opacity-70 transition-opacity"
            >
              <span>Wise</span>
              <span>{openSection === "wise" ? "−" : "+"}</span>
            </button>

            {openSection === "wise" && (
              <div className="px-4 pb-5 pt-1 space-y-4 text-center border-t border-border">
                <div className="flex justify-center pt-4">
                  <Image
                    src="/wise-qr.jpg.jpg"
                    alt="Wise QR code"
                    width={280}
                    height={280}
                    className="rounded-md object-contain"
                    priority
                  />
                </div>

                <a
                  href="https://wise.com/pay/me/rakshitam6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Wise payment link
                </a>
              </div>
            )}
          </div>

          <div className="border border-border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("dbs")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-lg hover:opacity-70 transition-opacity"
            >
              <span>DBS PayLah!</span>
              <span>{openSection === "dbs" ? "−" : "+"}</span>
            </button>

            {openSection === "dbs" && (
              <div className="px-4 pb-5 pt-1 space-y-4 text-center border-t border-border">
                <div className="flex justify-center pt-4">
                  <Image
                    src="/dbs-paylah-qr.jpg.jpg"
                    alt="DBS PayLah QR code"
                    width={280}
                    height={280}
                    className="rounded-md object-contain"
                    priority
                  />
                </div>

                <a
                  href="https://www.dbs.com.sg/personal/mobile/paylink/index.html?tranRef=eFosX2VWOd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  DBS payment link
                </a>
              </div>
            )}
          </div>

          <div className="border border-border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("ocbc")}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-lg hover:opacity-70 transition-opacity"
            >
              <span>OCBC</span>
              <span>{openSection === "ocbc" ? "−" : "+"}</span>
            </button>

            {openSection === "ocbc" && (
              <div className="px-4 pb-5 pt-1 space-y-4 text-center border-t border-border">
                <div className="flex justify-center pt-4">
                  <Image
                    src="/ocbc-qr.jpg.jpg"
                    alt="OCBC QR code"
                    width={280}
                    height={280}
                    className="rounded-md object-contain"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
