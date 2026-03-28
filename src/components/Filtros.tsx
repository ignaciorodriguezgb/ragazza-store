'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { CATEGORIAS, TALLES, type Categoria, type Talle } from '@/types'

const RANGOS_PRECIO = [
  { label: 'Todos', min: 0, max: Infinity },
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
}

const INITIAL_STATE: FiltrosState = {
  categoria: null,
  talles: [],
  precioMin: 0,
  precioMax: Infinity,
}

export function Filtros({ onChange }: FiltrosProps) {
  const [filtros, setFiltros] = useState<FiltrosState>(INITIAL_STATE)
  const [rangoActivo, setRangoActivo] = useState(0)

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
    update({ ...filtros, precioMin: RANGOS_PRECIO[index].min, precioMax: RANGOS_PRECIO[index].max })
  }

  const resetFiltros = () => {
    setRangoActivo(0)
    update(INITIAL_STATE)
  }

  const hayFiltros = filtros.categoria !== null || filtros.talles.length > 0 || rangoActivo !== 0

  return (
    <div className="w-full bg-white border border-brand-border rounded-sm p-5 space-y-5">
      {/* Categoría */}
      <div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-foreground/50 uppercase mb-3">
          Categoría
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategoria(cat)}
              className={`font-sans text-xs tracking-wide px-3 py-1.5 rounded-sm border transition-colors capitalize ${
                filtros.categoria === cat
                  ? 'bg-gold text-white border-gold'
                  : 'border-brand-border text-foreground/70 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Talle */}
      <div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-foreground/50 uppercase mb-3">
          Talle
        </p>
        <div className="flex gap-2">
          {TALLES.map((talle) => (
            <button
              key={talle}
              onClick={() => toggleTalle(talle)}
              className={`font-sans text-xs w-10 h-10 border rounded-sm transition-colors ${
                filtros.talles.includes(talle)
                  ? 'bg-gold text-white border-gold'
                  : 'border-brand-border text-foreground/70 hover:border-gold hover:text-gold'
              }`}
            >
              {talle}
            </button>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <p className="font-sans text-[10px] tracking-[0.3em] text-foreground/50 uppercase mb-3">
          Precio
        </p>
        <div className="flex flex-wrap gap-2">
          {RANGOS_PRECIO.map((rango, i) => (
            <button
              key={rango.label}
              onClick={() => setRango(i)}
              className={`font-sans text-xs tracking-wide px-3 py-1.5 rounded-sm border transition-colors ${
                rangoActivo === i
                  ? 'bg-gold text-white border-gold'
                  : 'border-brand-border text-foreground/70 hover:border-gold hover:text-gold'
              }`}
            >
              {rango.label}
            </button>
          ))}
        </div>
      </div>

      {/* Limpiar filtros */}
      {hayFiltros && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFiltros}
          className="font-sans text-xs text-brand-rose hover:text-brand-rose/80 p-0 h-auto"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
