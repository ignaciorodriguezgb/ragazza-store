import Image from 'next/image'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { WHATSAPP_NUMBER } from '@/types'

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa conocer el catálogo de Ragazza Store')}`

  return (
    <section className="relative min-h-[88vh] flex items-center bg-white overflow-hidden pt-[60px]">

      {/* Layout: text left — mood grid right */}
      <div className="max-w-7xl mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[88vh] pt-[80px] lg:pt-0">

        {/* Left: text */}
        <div className="flex flex-col justify-center py-16 lg:py-0 lg:pr-16">

          <p
            className="font-sans text-[10px] tracking-[0.35em] text-[#D4788C] uppercase mb-8"
            style={{ animationDelay: '0s' }}
          >
            Nueva colección
          </p>

          <h1
            className="font-serif font-light text-[#1C1917] leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 6.5vw, 6rem)' }}
          >
            Moda italiana<br />
            <span className="italic text-[#1C1917]/30">para vos.</span>
          </h1>

          <p className="font-sans text-sm text-[#1C1917]/50 leading-relaxed max-w-xs mb-10">
            Prendas de diseño italiano, seleccionadas especialmente. Consultá disponibilidad y precios directo por WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#categorias" className="btn-gold">
              Ver colección
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-dark inline-flex items-center gap-2"
            >
              <WhatsAppIcon size={14} />
              Consultá
            </a>
          </div>
        </div>

        {/* Right: mood board grid */}
        <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-2 pt-[110px] pb-8">
          <div className="row-span-2 relative overflow-hidden">
            <Image
              src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c8166889c1000a73f19495.svg"
              alt=""
              fill
              className="object-cover"
              sizes="25vw"
              priority
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c816684c0a46fdd3116740.svg"
              alt=""
              fill
              className="object-cover"
              sizes="25vw"
              priority
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c81668d1a9e708aa7e4416.svg"
              alt=""
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <Image
              src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c812b25b7f0406a17c71b2.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            <p className="absolute bottom-4 left-5 font-serif italic text-white/70 text-lg font-light">
              eleganza senza confini.
            </p>
          </div>
        </div>

        {/* Mobile: simple decorative bar */}
        <div
          className="lg:hidden h-3"
          style={{ background: 'linear-gradient(90deg, #C9A84C, #D4788C, #C9A84C)' }}
        />
      </div>
    </section>
  )
}
