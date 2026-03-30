'use client'

import Image from 'next/image'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { WHATSAPP_NUMBER } from '@/types'

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa conocer el catálogo de Ragazza Store')}`

  return (
    <section className="relative bg-white overflow-hidden pt-[64px] md:pt-[80px]">

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:grid grid-cols-2 min-h-[88vh]">

        {/* Left: text */}
        <div className="flex flex-col justify-center px-10 xl:px-20 py-16">
          <p className="font-sans text-[10px] tracking-[0.35em] text-[#D4788C] uppercase mb-8">
            Nueva colección
          </p>
          <h1
            className="font-serif font-light text-[#1C1917] leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)' }}
          >
            Moda italiana<br />
            <span className="italic text-[#1C1917]/30">para vos.</span>
          </h1>
          <p className="font-sans text-sm text-[#1C1917]/50 leading-relaxed max-w-xs mb-10">
            Prendas de diseño italiano, seleccionadas especialmente. Consultá disponibilidad y precios directo por WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/catalogo" className="btn-gold">Ver colección</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark inline-flex items-center gap-2">
              <WhatsAppIcon size={14} />
              Consultá
            </a>
          </div>
        </div>

        {/* Right: mood board */}
        <div className="grid grid-cols-2 grid-rows-3 gap-2 pt-[100px] pb-8 pr-5">
          <div className="row-span-2 relative overflow-hidden">
            <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c8166889c1000a73f19495.svg" alt="" fill className="object-cover" sizes="25vw" priority />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c816684c0a46fdd3116740.svg" alt="" fill className="object-cover" sizes="25vw" priority />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c81668d1a9e708aa7e4416.svg" alt="" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c812b25b7f0406a17c71b2.png" alt="" fill className="object-cover object-top" sizes="50vw" />
            <div className="absolute inset-0 bg-black/20" />
            <p className="absolute bottom-4 left-5 font-serif italic text-white/70 text-lg font-light">eleganza senza confini.</p>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden">

        {/* Text block */}
        <div className="px-5 pt-10 pb-8">
          <p className="font-sans text-[10px] tracking-[0.35em] text-[#D4788C] uppercase mb-5">
            Nueva colección
          </p>
          <h1 className="font-serif font-light text-[#1C1917] leading-[0.92] text-[2.8rem] mb-5">
            Moda italiana<br />
            <span className="italic text-[#1C1917]/30">para vos.</span>
          </h1>
          <p className="font-sans text-sm text-[#1C1917]/50 leading-relaxed mb-8">
            Prendas de diseño italiano. Consultá disponibilidad y precios directo por WhatsApp.
          </p>
          <div className="flex gap-3">
            <a href="/catalogo" className="btn-gold text-xs px-5 py-2.5">Ver colección</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark inline-flex items-center gap-2 text-xs px-4 py-2.5">
              <WhatsAppIcon size={13} />
              Consultá
            </a>
          </div>
        </div>

        {/* Image grid 2x2 */}
        <div className="grid grid-cols-2 gap-1.5 px-5 pb-10">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c8166889c1000a73f19495.svg" alt="" fill className="object-cover" sizes="50vw" priority />
          </div>
          <div className="aspect-[3/4] grid grid-rows-2 gap-1.5">
            <div className="relative overflow-hidden">
              <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c816684c0a46fdd3116740.svg" alt="" fill className="object-cover object-top" sizes="50vw" priority />
            </div>
            <div className="relative overflow-hidden">
              <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c81668d1a9e708aa7e4416.svg" alt="" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>

        {/* Gold tagline bar */}
        <div className="relative h-14 overflow-hidden">
          <Image src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c812b25b7f0406a17c71b2.png" alt="" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-black/30 flex items-center px-5">
            <p className="font-serif italic text-white/80 text-base font-light">eleganza senza confini.</p>
          </div>
        </div>
      </div>

    </section>
  )
}
