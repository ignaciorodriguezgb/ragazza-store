'use client'

import Image from 'next/image'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { formatPrecio, buildWhatsAppUrl } from '@/lib/appUtils'
import type { Prenda } from '@/types'

interface PrendaCardProps {
  prenda: Prenda
}

export function PrendaCard({ prenda }: PrendaCardProps) {
  const whatsappUrl = buildWhatsAppUrl(prenda.nombre)

  return (
    <article className="group bg-white">

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0EA]">
        {prenda.imagen_url ? (
          <Image
            src={prenda.imagen_url}
            alt={prenda.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-[#1C1917]/20 text-sm tracking-widest">Sin imagen</span>
          </div>
        )}

        {/* WhatsApp overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#1C1917] text-white font-sans text-[10px] tracking-[0.18em] uppercase py-3 w-full"
          >
            <WhatsAppIcon size={13} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="font-sans text-[9px] tracking-[0.22em] text-[#D4788C] uppercase mb-1">
          {prenda.categoria}
        </p>
        <h3 className="font-serif text-[1rem] font-light text-[#1C1917] leading-snug mb-1">
          {prenda.nombre}
        </h3>
        <p className="font-sans text-sm font-medium text-[#C9A84C]">
          {formatPrecio(prenda.precio)}
        </p>

        {/* Sizes */}
        {prenda.talles.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {prenda.talles.map((talle) => (
              <span
                key={talle}
                className="font-sans text-[9px] text-[#1C1917]/40 tracking-wide"
              >
                {talle}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
