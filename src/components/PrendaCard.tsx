'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { MessageCircle } from 'lucide-react'
import { formatPrecio, buildWhatsAppUrl } from '@/lib/appUtils'
import type { Prenda } from '@/types'

interface PrendaCardProps {
  prenda: Prenda
}

export function PrendaCard({ prenda }: PrendaCardProps) {
  const whatsappUrl = buildWhatsAppUrl(prenda.nombre)

  return (
    <div className="group flex flex-col bg-white rounded-sm overflow-hidden border border-brand-border hover:shadow-lg transition-shadow duration-300">
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden bg-background">
        {prenda.imagen_url ? (
          <Image
            src={prenda.imagen_url}
            alt={prenda.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-background">
            <span className="font-serif text-foreground/30 text-lg">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div>
          <p className="font-sans text-[10px] tracking-[0.25em] text-brand-rose uppercase mb-1">
            {prenda.categoria}
          </p>
          <h3 className="font-serif text-xl font-light text-foreground leading-tight">
            {prenda.nombre}
          </h3>
        </div>

        <p className="font-sans text-lg font-medium text-gold">
          {formatPrecio(prenda.precio)}
        </p>

        {/* Talles */}
        {prenda.talles.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prenda.talles.map((talle) => (
              <Badge
                key={talle}
                variant="outline"
                className="text-[10px] px-2 py-0 border-brand-border text-foreground/60 font-sans"
              >
                {talle}
              </Badge>
            ))}
          </div>
        )}

        {/* Botón WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center bg-gold hover:bg-gold/90 text-white font-sans text-xs tracking-wider px-4 py-2 rounded-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
