"use client"

import { useState } from "react"
import Image from "next/image"

export default function TeaPage() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => {
    setOpen(open === key ? null : key)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-serif">
      <div className="space-y-10 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl leading-tight">
            டீ கடையில் நாம்
          </h1>
          <p className="text-lg text-muted-foreground">
            A Cup Between Us
          </p>
        </div>

        <div className="space-y-6 text-[1.25rem] leading-[1.9]">
          <p>
            “Anna, two tea.” The stallowner moves without hurry, the kettle
            already humming somewhere behind the counter. The atmosphere is
            calmer now, a relief from the blazing sun, filled with the sweet
            aroma of sugar and milk stirred with shrunken tea leaves. The tea is
            poured into tumblers with immediacy, the scent of spices wafting
            through the air, the cups warm in the hand, with a quiet spot found
            on the wooden bench.
          </p>

          <p className="text-xl">
            Would you come have tea with me?
          </p>
        </div>

        {/* OPTIONS */}
        <div className="space-y-4 pt-4 text-left">
          
          {/* WISE QR */}
          <div>
            <button
              onClick={() => toggle("wise-qr")}
              className="w-full text-left px-4 py-3 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              Wise QR code
            </button>

            {open === "wise-qr" && (
              <div className="mt-4 flex justify-center">
                <Image
                  src="/wise-qr.jpg.jpg"
                  alt="Wise QR"
                  width={260}
                  height={260}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          {/* DBS QR */}
          <div>
            <button
              onClick={() => toggle("dbs-qr")}
              className="w-full text-left px-4 py-3 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              DBS QR code
            </button>

            {open === "dbs-qr" && (
              <div className="mt-4 flex justify-center">
                <Image
                  src="/dbs-paylah-qr.jpg.jpg"
                  alt="DBS QR"
                  width={260}
                  height={260}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          {/* OCBC QR */}
          <div>
            <button
              onClick={() => toggle("ocbc-qr")}
              className="w-full text-left px-4 py-3 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              OCBC QR code
            </button>

            {open === "ocbc-qr" && (
              <div className="mt-4 flex justify-center">
                <Image
                  src="/ocbc-qr.jpg.jpg"
                  alt="OCBC QR"
                  width={260}
                  height={260}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          {/* DBS LINK */}
          <div>
            <button
              onClick={() => toggle("dbs-link")}
              className="w-full text-left px-4 py-3 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              DBS payment link
            </button>

            {open === "dbs-link" && (
              <div className="mt-4 text-center">
                <a
                  href="https://www.dbs.com.sg/personal/mobile/paylink/index.html?tranRef=eFosX2VWOd"
                  target="_blank"
                  className="underline"
                >
                  Open DBS PayLah
                </a>
              </div>
            )}
          </div>

          {/* WISE LINK */}
          <div>
            <button
              onClick={() => toggle("wise-link")}
              className="w-full text-left px-4 py-3 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              Wise payment link
            </button>

            {open === "wise-link" && (
              <div className="mt-4 text-center">
                <a
                  href="https://wise.com/pay/me/rakshitam6"
                  target="_blank"
                  className="underline"
                >
                  Open Wise
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
