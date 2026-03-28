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
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin/catalogo"
          className="font-sans text-xs text-foreground/40 hover:text-foreground transition-colors"
        >
          ← Volver al catálogo
        </Link>
        <h1 className="font-serif text-3xl font-light text-foreground mt-4">Editar prenda</h1>
        <p className="font-sans text-sm text-foreground/50 mt-1">{prenda.nombre}</p>
        <div className="w-8 h-[1px] bg-gold mt-3" />
      </div>
      <PrendaForm prenda={prenda as Prenda} />
    </div>
  )
}
