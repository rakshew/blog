import { FooterMist } from "@/components/ui/footer-mist"

export function Footer() {
  return (
    <footer className="relative mt-24 h-[180px] overflow-hidden">
      <FooterMist />

      <div className="relative z-10 h-full max-w-2xl mx-auto px-6 flex items-end justify-center pb-10 text-center text-sm text-muted-foreground">
        flow state of perennial catharsis
      </div>
    </footer>
  )
}
