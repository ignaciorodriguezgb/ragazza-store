import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import Image from 'next/image'
import { WHATSAPP_NUMBER } from '@/types'

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero ver el catálogo de Ragazza Store')}`

  return (
    <footer className="bg-[#1C1917] text-white">

      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c80f3f89c100f412f11fda.svg"
                alt="Ragazza Store"
                width={32}
                height={32}
                className="object-contain opacity-70"
              />
              <div>
                <p className="font-serif text-base font-light tracking-[0.22em] text-white/80 leading-none">
                  RAGAZZA
                </p>
                <p className="font-sans text-[7px] tracking-[0.45em] text-[#C9A84C]/70 uppercase leading-none mt-[2px]">
                  STORE
                </p>
              </div>
            </div>
            <p className="font-sans text-xs text-white/40 leading-relaxed max-w-[200px]">
              Ropa italiana de mujer. Cada prenda, una historia de diseño y artesanía.
            </p>
            <p className="font-serif italic text-white/20 text-sm">
              eleganza senza confini.
            </p>
          </div>

          {/* Col 2: Links */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[9px] tracking-[0.3em] text-white/30 uppercase">
              Colecciones
            </p>
            {['Vestidos', 'Blusas', 'Pantalones', 'Sacos', 'Accesorios'].map((cat) => (
              <a
                key={cat}
                href="#catalogo"
                className="font-sans text-xs text-white/50 hover:text-white/80 transition-colors tracking-wide"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[9px] tracking-[0.3em] text-white/30 uppercase">
              Contacto
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <WhatsAppIcon size={13} />
              +598 944 85929
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              {/* Instagram icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @ragazzastore
            </a>
            <div className="mt-2 pt-4 border-t border-white/10">
              <p className="font-sans text-[9px] tracking-[0.2em] text-white/20 uppercase mb-1">
                Horarios de atención
              </p>
              <p className="font-sans text-xs text-white/40">
                Lun – Vie: 10:00 – 19:00
              </p>
              <p className="font-sans text-xs text-white/40">
                Sáb: 10:00 – 14:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[9px] tracking-wider text-white/20 uppercase">
            © {new Date().getFullYear()} Ragazza Store · Montevideo, Uruguay
          </p>
          <p className="font-sans text-[9px] tracking-wider text-white/20 uppercase">
            Moda Italiana
          </p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: '#25D366' }}
      >
        <WhatsAppIcon size={22} className="text-white" />
      </a>
    </footer>
  )
}
