import { PrendaForm } from '@/components/admin/PrendaForm'
import Link from 'next/link'

export default function NuevaPrenda() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link
            href="/admin/catalogo"
            className="font-sans text-[10px] tracking-wider text-foreground/40 hover:text-foreground transition-colors uppercase"
          >
            ← Volver al catálogo
          </Link>
          <h1 className="heading-display text-3xl text-foreground mt-4">Nueva prenda</h1>
          <div className="gold-line mt-4" />
        </div>
        <PrendaForm />
      </div>
    </div>
  )
}
