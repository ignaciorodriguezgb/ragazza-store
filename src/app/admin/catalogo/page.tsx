import { createSupabaseServerClient } from '@/lib/supabase-server'
import { PrendaTable } from '@/components/admin/PrendaTable'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'
import type { Prenda } from '@/types'

export default async function AdminCatalogo() {
  const supabase = await createSupabaseServerClient()

  const { data: prendas } = await supabase
    .from('prendas')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-brand-border">
        <div className="flex items-center gap-4">
          <p className="font-sans text-xs tracking-[0.3em] text-brand-rose uppercase">Panel Admin</p>
          <span className="text-brand-border">|</span>
          <Link href="/" className="font-sans text-xs text-foreground/40 hover:text-foreground transition-colors">
            Ver sitio →
          </Link>
        </div>
        <LogoutButton />
      </div>

      <PrendaTable prendas={(prendas as Prenda[]) ?? []} />
    </div>
  )
}
