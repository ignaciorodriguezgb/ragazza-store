import { Navbar } from '@/components/Navbar'
import { CatalogoClient } from '@/components/CatalogoClient'
import { Footer } from '@/components/Footer'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { Prenda, Categoria } from '@/types'
import { CATEGORIAS } from '@/types'

interface Props {
  searchParams: Promise<{ categoria?: string }>
}

export const revalidate = 60

export default async function CatalogoPage({ searchParams }: Props) {
  const { categoria } = await searchParams

  // Validate categoria param
  const categoriaDefault = CATEGORIAS.includes(categoria as Categoria)
    ? (categoria as Categoria)
    : null

  const supabase = await createSupabaseServerClient()
  const { data: prendas } = await supabase
    .from('prendas')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false })

  return (
    <main className="bg-white">
      <Navbar />

      {/* Page header */}
      <div className="pt-[80px] border-b border-[#E8E3DD]">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <p className="font-sans text-[10px] tracking-[0.3em] text-[#D4788C] uppercase mb-2">
            {categoriaDefault ? categoriaDefault : 'Todas las categorías'}
          </p>
          <h1 className="font-serif text-4xl font-light text-[#1C1917]">Catálogo</h1>
        </div>
      </div>

      <CatalogoClient
        prendas={(prendas as Prenda[]) ?? []}
        categoriaDefault={categoriaDefault}
      />

      <Footer />
    </main>
  )
}
