export default function TeaPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="space-y-8">
        
        {/* TITLE */}
        <h1 className="font-serif text-xl italic">
          டீ கடையில் நாம் / A Cup Between Us
        </h1>

        {/* DESCRIPTION */}
        <p className="italic text-lg leading-relaxed">
          “Anna, two tea.” The stallowner moves without hurry, the kettle already
          humming somewhere behind the counter. The atmosphere is calmer now, a
          relief from the blazing sun, filled with the sweet aroma of sugar and
          milk stirred with shrunken tea leaves. The tea is poured into tumblers
          with immediacy, the scent of spices wafting through the air, the cups
          warm in the hand, with a quiet spot found on the wooden bench.
        </p>

        {/* INVITATION */}
        <p className="italic text-xl">
          Would you come have tea with me?
        </p>

        {/* QR */}
        <div className="flex justify-center">
          <img
            src="/qr.png"
            alt="QR Code"
            className="w-56 h-56 object-contain"
          />
        </div>

        {/* LINK */}
        <a
          href="https://wise.com/pay/me/rakshitam6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline hover:opacity-70"
        >
          Open payment link
        </a>

      </div>
    </main>
  )
}
