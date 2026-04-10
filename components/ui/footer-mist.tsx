export function FooterMist() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px] overflow-hidden">
      
      {/* Main golden mist */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,200,120,0.22),_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,_rgba(255,200,120,0.10),_transparent_70%)] blur-3xl" />

      {/* Soft spread layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,215,150,0.12),_transparent_75%)] dark:bg-[radial-gradient(ellipse_at_bottom,_rgba(255,215,150,0.06),_transparent_75%)] blur-2xl" />

      {/* Wide glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,190,100,0.08),_transparent_80%)] dark:bg-[radial-gradient(ellipse_at_bottom,_rgba(255,190,100,0.05),_transparent_80%)] blur-xl" />

    </div>
  )
}
