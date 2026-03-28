'use client'

import { useState, useMemo } from 'react'
import { Filtros, type FiltrosState } from '@/components/Filtros'
import { PrendaCard } from '@/components/PrendaCard'
import type { Prenda } from '@/types'

interface CatalogoClientProps {
  prendas: Prenda[]
}

export function CatalogoClient({ prendas }: CatalogoClientProps) {
  const [filtros, setFiltros] = useState<FiltrosState>({
    categoria: null,
    talles: [],
    precioMin: 0,
    precioMax: Infinity,
  })

  const prendasFiltradas = useMemo(() => {
    return prendas.filter((p) => {
      if (filtros.categoria && p.categoria !== filtros.categoria) return false
      if (filtros.talles.length > 0 && !filtros.talles.some((t) => p.talles.includes(t))) return false
      if (p.precio < filtros.precioMin || p.precio > filtros.precioMax) return false
      return true
    })
  }, [prendas, filtros])

  if (prendas.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-2xl font-light text-foreground/50">Pronto nuevas colecciones</p>
        <p className="font-sans text-sm text-foreground/40 mt-2">
          Escribinos por WhatsApp para más información
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar filtros */}
      <aside className="w-full lg:w-64 shrink-0">
        <Filtros onChange={setFiltros} />
      </aside>

      {/* Grid de prendas */}
      <div className="flex-1">
        {prendasFiltradas.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl font-light text-foreground/50">
              No encontramos prendas con esos filtros
            </p>
            <button
              onClick={() => setFiltros({ categoria: null, talles: [], precioMin: 0, precioMax: Infinity })}
              className="font-sans text-xs text-brand-rose hover:underline mt-3 block mx-auto"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {prendasFiltradas.map((prenda) => (
              <PrendaCard key={prenda.id} prenda={prenda} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
