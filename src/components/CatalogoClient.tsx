'use client'

import { useState, useMemo } from 'react'
import { Filtros, type FiltrosState } from '@/components/Filtros'
import { PrendaCard } from '@/components/PrendaCard'
import type { Prenda, Categoria } from '@/types'

interface CatalogoClientProps {
  prendas: Prenda[]
  categoriaDefault?: Categoria | null
}

export function CatalogoClient({ prendas, categoriaDefault }: CatalogoClientProps) {
  const [filtros, setFiltros] = useState<FiltrosState>({
    categoria: categoriaDefault ?? null,
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
      <div className="bg-white py-24 text-center">
        <p className="font-serif text-2xl font-light text-[#1C1917]/30">
          Pronto nuevas colecciones
        </p>
        <p className="font-sans text-xs tracking-wider text-[#1C1917]/25 mt-3 uppercase">
          Escribinos por WhatsApp para más información
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Sticky horizontal filters */}
      <div className="sticky top-[64px] md:top-[80px] z-40">
        <Filtros onChange={setFiltros} initialCategoria={categoriaDefault} />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {prendasFiltradas.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl font-light text-[#1C1917]/30">
              Ninguna prenda coincide con los filtros
            </p>
            <button
              onClick={() => setFiltros({ categoria: null, talles: [], precioMin: 0, precioMax: Infinity })}
              className="font-sans text-[10px] tracking-widest text-[#D4788C] hover:text-[#D4788C]/70 mt-4 uppercase transition-colors"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <>
            <p className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/30 uppercase mb-6">
              {prendasFiltradas.length} prenda{prendasFiltradas.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {prendasFiltradas.map((prenda) => (
                <PrendaCard key={prenda.id} prenda={prenda} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
