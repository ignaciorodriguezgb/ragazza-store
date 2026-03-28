import { createSupabaseServerClient } from '@/lib/supabase-server'
import { PrendaForm } from '@/components/admin/PrendaForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Prenda } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarPrenda({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: prenda } = await supabase
    .from('prendas')
    .select('*')
    .eq('id', id)
    .single()

  if (!prenda) notFound()

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
          <h1 className="heading-display text-3xl text-foreground mt-4">Editar prenda</h1>
          <p className="font-sans text-sm text-foreground/40 mt-1">{prenda.nombre}</p>
          <div className="gold-line mt-4" />
        </div>
        <PrendaForm prenda={prenda as Prenda} />
      </div>
    </div>
  )
}
