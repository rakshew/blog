import { FooterMist } from "@/components/ui/footer-mist"

export function Footer() {
  return (
    <footer className="relative mt-24">

      {/* Mist anchored here */}
      <FooterMist />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center text-sm text-muted-foreground">
        flow state of perennial catharsis
      </div>
    </footer>
  )
}
