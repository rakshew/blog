export default function WritePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 font-serif">
      <div className="space-y-12 text-center">

        {/* Title Section */}
        <div className="space-y-2">
          <h1 className="text-2xl leading-tight">
            For a Line
          </h1>
          <p className="text-lg text-muted-foreground">
            Sometimes, a line belongs somewhere else.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-8 text-[1.2rem] leading-[1.9]">
          
          <p>
            Maybe it was the first time you tried to say something and stopped halfway, the words catching somewhere between your throat and your breath.
          </p>

          <p>
            Or perhaps it was a quiet evening, when everything had settled, but the fervour in you had not. A thought kept returning, not loud enough to disturb you, but not willing to leave either. It stayed, turning over itself, tugging at you to be uttered.
          </p>

          <p>
            If there is something like that with you, we can trace it as it is without forcing it forward, until it finds its way into words. It could become a line, a letter, or something held in your name.
          </p>

          <p>
            Let’s pen it!: <br />
            <a
              href="mailto:thecommongood10@gmail.com"
              className="underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              thecommongood10@gmail.com
            </a>
          </p>

          <p>
            If you choose to leave something for it, let it be what it felt like to you.
          </p>

          <p>It’s your piece now.</p>

        </div>
      </div>
    </main>
  )
}
