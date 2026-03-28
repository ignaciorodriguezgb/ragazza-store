'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createSupabaseBrowserClient } from '@/lib/supabase-client'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrecio } from '@/lib/appUtils'
import type { Prenda } from '@/types'
import { Pencil, Trash2, EyeOff, Eye, Plus } from 'lucide-react'

interface PrendaTableProps {
  prendas: Prenda[]
}

export function PrendaTable({ prendas: initialPrendas }: PrendaTableProps) {
  const [prendas, setPrendas] = useState(initialPrendas)
  const [deleteTarget, setDeleteTarget] = useState<Prenda | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function toggleActiva(prenda: Prenda) {
    setLoadingId(prenda.id)
    const { error } = await supabase
      .from('prendas')
      .update({ activa: !prenda.activa })
      .eq('id', prenda.id)

    if (!error) {
      setPrendas((prev) =>
        prev.map((p) => p.id === prenda.id ? { ...p, activa: !p.activa } : p)
      )
    }
    setLoadingId(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setLoadingId(deleteTarget.id)

    if (deleteTarget.imagen_url) {
      const fileName = deleteTarget.imagen_url.split('/').pop()
      if (fileName) {
        await supabase.storage.from('imagenes').remove([fileName])
      }
    }

    const { error } = await supabase
      .from('prendas')
      .delete()
      .eq('id', deleteTarget.id)

    if (!error) {
      setPrendas((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    }

    setLoadingId(null)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-foreground">Catálogo</h1>
          <p className="font-sans text-xs text-foreground/40 mt-1">{prendas.length} prendas en total</p>
        </div>
        <Button
          onClick={() => router.push('/admin/nueva')}
          className="bg-gold hover:bg-gold/90 text-white font-sans text-xs tracking-wider"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar prenda
        </Button>
      </div>

      {prendas.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-border rounded-sm">
          <p className="font-serif text-xl font-light text-foreground/40">Sin prendas todavía</p>
          <button
            onClick={() => router.push('/admin/nueva')}
            className="font-sans text-xs text-brand-rose hover:underline mt-2 block mx-auto"
          >
            Agregar la primera prenda
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {prendas.map((prenda) => (
            <div
              key={prenda.id}
              className={`flex items-center gap-4 p-4 bg-white border border-brand-border rounded-sm transition-opacity ${
                !prenda.activa ? 'opacity-60' : ''
              }`}
            >
              <div className="w-16 h-20 shrink-0 relative rounded-sm overflow-hidden bg-background">
                {prenda.imagen_url ? (
                  <Image src={prenda.imagen_url} alt={prenda.nombre} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-foreground/20 text-xs">Sin img</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif text-lg font-light truncate">{prenda.nombre}</span>
                  <Badge
                    variant={prenda.activa ? 'default' : 'secondary'}
                    className={`text-[10px] shrink-0 ${prenda.activa ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {prenda.activa ? 'Activa' : 'Sin stock'}
                  </Badge>
                </div>
                <p className="font-sans text-xs text-foreground/50 capitalize">{prenda.categoria}</p>
                <p className="font-sans text-sm font-medium text-gold mt-1">{formatPrecio(prenda.precio)}</p>
                {prenda.talles.length > 0 && (
                  <p className="font-sans text-xs text-foreground/40 mt-0.5">
                    {prenda.talles.join(' · ')}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleActiva(prenda)}
                  disabled={loadingId === prenda.id}
                  title={prenda.activa ? 'Dar de baja' : 'Reactivar'}
                  className="h-8 w-8 text-foreground/50 hover:text-gold"
                >
                  {prenda.activa ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/admin/editar/${prenda.id}`)}
                  className="h-8 w-8 text-foreground/50 hover:text-gold"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(prenda)}
                  disabled={loadingId === prenda.id}
                  className="h-8 w-8 text-foreground/50 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteTarget !== null}
        title="¿Eliminar prenda?"
        description={`Esta acción eliminará "${deleteTarget?.nombre}" permanentemente. No se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={loadingId === deleteTarget?.id}
      />
    </div>
  )
}
