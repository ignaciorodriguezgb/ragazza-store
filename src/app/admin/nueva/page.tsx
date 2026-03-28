import { PrendaForm } from '@/components/admin/PrendaForm'
import Link from 'next/link'

export default function NuevaPrenda() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin/catalogo"
          className="font-sans text-xs text-foreground/40 hover:text-foreground transition-colors"
        >
          ← Volver al catálogo
        </Link>
        <h1 className="font-serif text-3xl font-light text-foreground mt-4">Nueva prenda</h1>
        <div className="w-8 h-[1px] bg-gold mt-3" />
      </div>
      <PrendaForm />
    </div>
  )
}
