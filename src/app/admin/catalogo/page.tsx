import { createSupabaseServerClient } from '@/lib/supabase-server'
import { PrendaTable } from '@/components/admin/PrendaTable'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'
import Image from 'next/image'
import type { Prenda } from '@/types'

export default async function AdminCatalogo() {
  const supabase = await createSupabaseServerClient()

  const { data: prendas } = await supabase
    .from('prendas')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">

      {/* Admin header */}
      <header className="border-b border-brand-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://assets.cdn.filesafe.space/wqut8nAElrNZjsfF73RK/media/69c7fd24d4c304383e4eba5d.svg"
              alt="Ragazza Store"
              width={28}
              height={28}
              className="object-contain opacity-70"
            />
            <div className="h-4 w-px bg-brand-border" />
            <p className="font-sans text-[10px] tracking-[0.3em] text-brand-rose uppercase">
              Panel Admin
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="font-sans text-[10px] tracking-wider text-foreground/40 hover:text-foreground transition-colors uppercase"
            >
              Ver sitio →
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="label-spaced text-brand-rose mb-2 text-[9px]">Gestión de catálogo</p>
            <h1 className="heading-display text-3xl text-foreground">Prendas</h1>
          </div>
          <Link
            href="/admin/nueva"
            className="btn-gold text-[9px] py-3 px-5"
          >
            + Nueva prenda
          </Link>
        </div>

        <div className="gold-line-full mb-8" />

        <PrendaTable prendas={(prendas as Prenda[]) ?? []} />
      </div>
    </div>
  )
}
