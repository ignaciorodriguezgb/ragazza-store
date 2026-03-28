'use client'

import { useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { CATEGORIAS, TALLES, type Categoria, type Talle } from '@/types'

const RANGOS_PRECIO = [
  { label: 'Todos los precios', min: 0, max: Infinity },
  { label: 'Hasta $1.000', min: 0, max: 1000 },
  { label: '$1.000 – $3.000', min: 1000, max: 3000 },
  { label: 'Más de $3.000', min: 3000, max: Infinity },
]

export interface FiltrosState {
  categoria: Categoria | null
  talles: Talle[]
  precioMin: number
  precioMax: number
}

interface FiltrosProps {
  onChange: (filtros: FiltrosState) => void
  initialCategoria?: Categoria | null
}

export function Filtros({ onChange, initialCategoria }: FiltrosProps) {
  const INITIAL_STATE: FiltrosState = {
    categoria: initialCategoria ?? null,
    talles: [],
    precioMin: 0,
    precioMax: Infinity,
  }

  const [filtros, setFiltros] = useState<FiltrosState>(INITIAL_STATE)
  const [rangoActivo, setRangoActivo] = useState(0)
  const [precioOpen, setPrecioOpen] = useState(false)

  const update = useCallback((next: FiltrosState) => {
    setFiltros(next)
    onChange(next)
  }, [onChange])

  const toggleCategoria = (cat: Categoria) => {
    update({ ...filtros, categoria: filtros.categoria === cat ? null : cat })
  }

  const toggleTalle = (talle: Talle) => {
    const talles = filtros.talles.includes(talle)
      ? filtros.talles.filter((t) => t !== talle)
      : [...filtros.talles, talle]
    update({ ...filtros, talles })
  }

  const setRango = (index: number) => {
    setRangoActivo(index)
    setPrecioOpen(false)
    update({ ...filtros, precioMin: RANGOS_PRECIO[index].min, precioMax: RANGOS_PRECIO[index].max })
  }

  const resetFiltros = () => {
    setRangoActivo(0)
    setPrecioOpen(false)
    update({ categoria: null, talles: [], precioMin: 0, precioMax: Infinity })
  }

  const hayFiltros = filtros.categoria !== null || filtros.talles.length > 0 || rangoActivo !== 0

  return (
    <div className="border-b border-[#E8E3DD] bg-white">
      <div className="max-w-7xl mx-auto px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">

        {/* Categories */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mr-1">Categoría</span>
          <button
            onClick={() => update({ ...filtros, categoria: null })}
            className={`font-sans text-[10px] tracking-[0.12em] px-3 py-1 border transition-colors duration-150 uppercase ${
              filtros.categoria === null
                ? 'border-[#1C1917] bg-[#1C1917] text-white'
                : 'border-[#E8E3DD] text-[#1C1917]/60 hover:border-[#1C1917]/40'
            }`}
          >
            Todas
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategoria(cat)}
              className={`font-sans text-[10px] tracking-[0.12em] px-3 py-1 border transition-colors duration-150 capitalize ${
                filtros.categoria === cat
                  ? 'border-[#1C1917] bg-[#1C1917] text-white'
                  : 'border-[#E8E3DD] text-[#1C1917]/60 hover:border-[#1C1917]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:block h-4 w-px bg-[#E8E3DD]" />

        {/* Sizes */}
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mr-1">Talle</span>
          {TALLES.map((talle) => (
            <button
              key={talle}
              onClick={() => toggleTalle(talle)}
              className={`font-sans text-[10px] w-8 h-7 border transition-colors duration-150 ${
                filtros.talles.includes(talle)
                  ? 'border-[#1C1917] bg-[#1C1917] text-white'
                  : 'border-[#E8E3DD] text-[#1C1917]/60 hover:border-[#1C1917]/40'
              }`}
            >
              {talle}
            </button>
          ))}
        </div>

        <div className="hidden sm:block h-4 w-px bg-[#E8E3DD]" />

        {/* Price */}
        <div className="relative">
          <button
            onClick={() => setPrecioOpen(!precioOpen)}
            className={`font-sans text-[10px] tracking-[0.12em] px-3 py-1 border transition-colors duration-150 flex items-center gap-1 uppercase ${
              rangoActivo !== 0
                ? 'border-[#1C1917] bg-[#1C1917] text-white'
                : 'border-[#E8E3DD] text-[#1C1917]/60 hover:border-[#1C1917]/40'
            }`}
          >
            {rangoActivo === 0 ? 'Precio' : RANGOS_PRECIO[rangoActivo].label}
            <span style={{ fontSize: '8px' }}>▼</span>
          </button>
          {precioOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#E8E3DD] z-20 min-w-[180px] shadow-sm">
              {RANGOS_PRECIO.map((rango, i) => (
                <button
                  key={rango.label}
                  onClick={() => setRango(i)}
                  className={`block w-full text-left font-sans text-[10px] tracking-wide px-4 py-2 hover:bg-[#F8F4EF] transition-colors ${
                    rangoActivo === i ? 'text-[#C9A84C] font-medium' : 'text-[#1C1917]/70'
                  }`}
                >
                  {rango.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {hayFiltros && (
          <button
            onClick={resetFiltros}
            className="flex items-center gap-1 font-sans text-[10px] tracking-wider text-[#D4788C] hover:text-[#D4788C]/70 transition-colors uppercase"
          >
            <X style={{ width: '10px', height: '10px' }} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}
