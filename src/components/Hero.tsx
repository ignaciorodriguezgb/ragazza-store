export function Hero() {
  return (
    <section className="w-full py-20 px-6 text-center bg-background">
      <div className="max-w-2xl mx-auto">
        <p className="font-sans text-xs tracking-[0.4em] text-brand-rose uppercase mb-4">
          Moda Italiana
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-foreground leading-tight mb-6">
          Eleganza senza confini
        </h1>
        <p className="font-sans text-sm text-foreground/60 tracking-wide max-w-md mx-auto">
          Cada prenda es una historia. Descubrí nuestra colección y consultá directamente por WhatsApp.
        </p>
        <div className="mt-8 w-12 h-[1px] bg-gold mx-auto" />
      </div>
    </section>
  )
}
