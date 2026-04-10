import { FooterMist } from "@/components/ui/footer-mist"

export function Footer() {
  return (
    <footer className="relative mt-24">
      <FooterMist />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-10 text-center text-sm text-muted-foreground">
        flow state of perennial catharsis
      </div>
    </footer>
  )
}
