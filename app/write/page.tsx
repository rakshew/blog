export default function WritePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 font-serif">
      <div className="space-y-10 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl leading-tight">For a Line</h1>
          <p className="text-lg text-muted-foreground">
            Sometimes a line belongs somewhere else.
          </p>
        </div>

        <div className="space-y-6 text-[1.2rem] leading-[1.9]">
          <p>
            Sometimes a line belongs somewhere else, or to someone in
            particular. If you want something like that, you can write to me at{" "}
            <a
              href="mailto:thecommongood10@gmail.com"
              className="underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              thecommongood10@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="pt-2">
          <a
            href="mailto:thecommongood10@gmail.com?subject=Writing%20Request"
            className="inline-block px-5 py-3 border border-border rounded-md text-lg hover:opacity-70 transition-opacity"
          >
            Write to me
          </a>
        </div>
      </div>
    </main>
  )
}
