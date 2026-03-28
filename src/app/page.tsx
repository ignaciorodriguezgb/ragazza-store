import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Footer } from '@/components/Footer'
import { CatalogoClient } from '@/components/CatalogoClient'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { Prenda } from '@/types'

export const revalidate = 60

export default async function Home() {
  const supabase = await createSupabaseServerClient()
  const { data: prendas } = await supabase
    .from('prendas')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false })

  return (
    <main>
      <Navbar />
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="font-serif text-3xl font-light text-foreground">Colección</h2>
          <p className="font-sans text-xs text-foreground/40 tracking-wider">
            {prendas?.length ?? 0} prendas
          </p>
        </div>
        <CatalogoClient prendas={(prendas as Prenda[]) ?? []} />
      </section>
      <Footer />
    </main>
  )
}
