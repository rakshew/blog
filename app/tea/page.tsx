// /app/tea/page.tsx

import Image from "next/image"

export default function TeaPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="space-y-10 text-center">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl leading-tight">
            டீ கடையில் நாம்
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            A Cup Between Us
          </p>
        </div>

        <div className="space-y-6 font-serif text-[1.45rem] leading-[1.9]">
          <p>
            “Anna, two tea.” The stallowner moves without hurry, the kettle
            already humming somewhere behind the counter. The atmosphere is
            calmer now, a relief from the blazing sun, filled with the sweet
            aroma of sugar and milk stirred with shrunken tea leaves. The tea is
            poured into tumblers with immediacy, the scent of spices wafting
            through the air, the cups warm in the hand, with a quiet spot found
            on the wooden bench.
          </p>

          <p className="text-2xl leading-relaxed">
            Would you come have tea with me?
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 pt-4">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl">Wise</h2>
            <div className="flex justify-center">
              <Image
                src="/wise-qr.jpg"
                alt="Wise QR code"
                width={320}
                height={320}
                className="rounded-md object-contain"
                priority
              />
            </div>
            <a
              href="https://wise.com/pay/me/rakshitam6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-serif text-lg underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Open Wise link
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl">DBS PayLah!</h2>
            <div className="flex justify-center">
              <Image
                src="/dbs-paylah-qr.jpg"
                alt="DBS PayLah QR code"
                width={320}
                height={320}
                className="rounded-md object-contain"
                priority
              />
            </div>
            <a
              href="https://www.dbs.com.sg/personal/mobile/paylink/index.html?tranRef=eFosX2VWOd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-serif text-lg underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Open DBS PayLah link
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
