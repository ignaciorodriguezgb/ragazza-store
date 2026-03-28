import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/types'

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero ver el catálogo de Ragazza Store')}`

  return (
    <footer className="w-full border-t border-brand-border bg-background py-12 px-6 mt-20">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="w-8 h-[1px] bg-gold mx-auto" />
        <div>
          <p className="font-serif text-2xl font-light tracking-[0.15em] text-foreground">
            RAGAZZA STORE
          </p>
          <p className="font-sans text-xs tracking-[0.3em] text-brand-rose uppercase mt-1">
            Moda Italiana
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm text-foreground/70 hover:text-gold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Escribinos por WhatsApp
        </a>
        <p className="font-sans text-xs text-foreground/40">
          © {new Date().getFullYear()} Ragazza Store. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
