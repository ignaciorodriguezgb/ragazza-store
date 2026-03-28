import { Clock, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { WHATSAPP_NUMBER } from '@/types'

export function ContactoSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa conocer el catálogo de Ragazza Store')}`

  return (
    <section id="contacto" className="bg-white py-16 lg:py-20 border-t border-[#E8E3DD]">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: heading + CTA */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] text-[#D4788C] uppercase mb-4">
              Hablemos
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight mb-6">
              ¿Te interesa<br />
              <span className="italic text-[#1C1917]/30">alguna prenda?</span>
            </h2>
            <p className="font-sans text-sm text-[#1C1917]/50 leading-relaxed max-w-sm mb-8">
              Consultá disponibilidad, talles y precios directamente por WhatsApp. Respondemos a la brevedad.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <WhatsAppIcon size={15} />
              Escribinos por WhatsApp
            </a>
          </div>

          {/* Right: info */}
          <div className="flex flex-col gap-7">

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 border border-[#E8E3DD] flex items-center justify-center shrink-0">
                <WhatsAppIcon size={16} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/40 uppercase mb-1">
                  WhatsApp
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#1C1917] hover:text-[#C9A84C] transition-colors"
                >
                  +598 944 85929
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 border border-[#E8E3DD] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/40 uppercase mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#1C1917] hover:text-[#C9A84C] transition-colors"
                >
                  @ragazzastore
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 border border-[#E8E3DD] flex items-center justify-center shrink-0">
                <Clock size={16} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/40 uppercase mb-1">
                  Atención
                </p>
                <p className="font-sans text-sm text-[#1C1917]">Lun – Vie: 10:00 – 19:00</p>
                <p className="font-sans text-sm text-[#1C1917]">Sáb: 10:00 – 14:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 border border-[#E8E3DD] flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#C9A84C]" />
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/40 uppercase mb-1">
                  Ubicación
                </p>
                <p className="font-sans text-sm text-[#1C1917]">Montevideo, Uruguay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
