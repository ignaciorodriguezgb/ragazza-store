'use client'

import { useState, useCallback } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

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
    setMobileOpen(false)
    update({ categoria: null, talles: [], precioMin: 0, precioMax: Infinity })
  }

  const hayFiltros = filtros.categoria !== null || filtros.talles.length > 0 || rangoActivo !== 0
  const activeCount = (filtros.categoria ? 1 : 0) + filtros.talles.length + (rangoActivo !== 0 ? 1 : 0)

  const chipBase = 'font-sans text-[10px] tracking-[0.12em] px-3 py-1.5 border transition-colors duration-150 whitespace-nowrap'
  const chipActive = 'border-[#1C1917] bg-[#1C1917] text-white'
  const chipInactive = 'border-[#E8E3DD] text-[#1C1917]/60 hover:border-[#1C1917]/40'

  return (
    <>
      {/* ── DESKTOP filters ── */}
      <div className="hidden md:block border-b border-[#E8E3DD] bg-white">
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mr-1">Categoría</span>
            <button onClick={() => update({ ...filtros, categoria: null })} className={`${chipBase} ${filtros.categoria === null ? chipActive : chipInactive} uppercase`}>Todas</button>
            {CATEGORIAS.map((cat) => (
              <button key={cat} onClick={() => toggleCategoria(cat)} className={`${chipBase} ${filtros.categoria === cat ? chipActive : chipInactive} capitalize`}>{cat}</button>
            ))}
          </div>
          <div className="hidden sm:block h-4 w-px bg-[#E8E3DD]" />
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mr-1">Talle</span>
            {TALLES.map((talle) => (
              <button key={talle} onClick={() => toggleTalle(talle)} className={`font-sans text-[10px] w-8 h-7 border transition-colors duration-150 ${filtros.talles.includes(talle) ? chipActive : chipInactive}`}>{talle}</button>
            ))}
          </div>
          <div className="hidden sm:block h-4 w-px bg-[#E8E3DD]" />
          <div className="relative">
            <button onClick={() => setPrecioOpen(!precioOpen)} className={`${chipBase} ${rangoActivo !== 0 ? chipActive : chipInactive} uppercase flex items-center gap-1`}>
              {rangoActivo === 0 ? 'Precio' : RANGOS_PRECIO[rangoActivo].label}
              <span style={{ fontSize: '8px' }}>▼</span>
            </button>
            {precioOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-[#E8E3DD] z-20 min-w-[180px] shadow-sm">
                {RANGOS_PRECIO.map((rango, i) => (
                  <button key={rango.label} onClick={() => setRango(i)} className={`block w-full text-left font-sans text-[10px] tracking-wide px-4 py-2 hover:bg-[#F8F4EF] transition-colors ${rangoActivo === i ? 'text-[#C9A84C] font-medium' : 'text-[#1C1917]/70'}`}>{rango.label}</button>
                ))}
              </div>
            )}
          </div>
          {hayFiltros && (
            <button onClick={resetFiltros} className="flex items-center gap-1 font-sans text-[10px] tracking-wider text-[#D4788C] hover:text-[#D4788C]/70 transition-colors uppercase">
              <X style={{ width: '10px', height: '10px' }} />Limpiar
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE filters ── */}
      <div className="md:hidden border-b border-[#E8E3DD] bg-white">
        <div className="flex items-center gap-2 px-4 py-2.5">
          {/* Scrollable category pills */}
          <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
              <button onClick={() => update({ ...filtros, categoria: null })} className={`${chipBase} ${filtros.categoria === null ? chipActive : chipInactive} uppercase`}>Todas</button>
              {CATEGORIAS.filter(c => c !== 'accesorios').map((cat) => (
                <button key={cat} onClick={() => toggleCategoria(cat)} className={`${chipBase} ${filtros.categoria === cat ? chipActive : chipInactive} capitalize`}>{cat}</button>
              ))}
            </div>
          </div>
          {/* More filters button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="shrink-0 relative flex items-center gap-1.5 font-sans text-[10px] tracking-wider uppercase border border-[#E8E3DD] px-3 py-1.5"
          >
            <SlidersHorizontal size={11} />
            Más
            {activeCount > (filtros.categoria ? 1 : 0) && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#D4788C] text-white text-[8px] flex items-center justify-center">
                {activeCount - (filtros.categoria ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Expanded panel for talle + precio */}
        {mobileOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-[#E8E3DD] flex flex-col gap-4">
            <div>
              <p className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mb-2">Talle</p>
              <div className="flex gap-1.5 flex-wrap">
                {TALLES.map((talle) => (
                  <button key={talle} onClick={() => toggleTalle(talle)} className={`font-sans text-[10px] w-9 h-8 border transition-colors duration-150 ${filtros.talles.includes(talle) ? chipActive : chipInactive}`}>{talle}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-sans text-[9px] tracking-[0.25em] text-[#1C1917]/30 uppercase mb-2">Precio</p>
              <div className="flex flex-col gap-1.5">
                {RANGOS_PRECIO.map((rango, i) => (
                  <button key={rango.label} onClick={() => setRango(i)} className={`text-left font-sans text-[11px] px-3 py-2 border transition-colors ${rangoActivo === i ? 'border-[#1C1917] bg-[#1C1917] text-white' : 'border-[#E8E3DD] text-[#1C1917]/60'}`}>{rango.label}</button>
                ))}
              </div>
            </div>
            {hayFiltros && (
              <button onClick={resetFiltros} className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider text-[#D4788C] uppercase">
                <X size={10} />Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
