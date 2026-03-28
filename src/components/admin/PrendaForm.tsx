'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import imageCompression from 'browser-image-compression'
import { createSupabaseBrowserClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CATEGORIAS, TALLES, type Prenda, type Categoria, type Talle } from '@/types'

interface PrendaFormProps {
  prenda?: Prenda
}

interface FormState {
  nombre: string
  descripcion: string
  categoria: Categoria
  precio: string
  talles: Talle[]
  activa: boolean
}

export function PrendaForm({ prenda }: PrendaFormProps) {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>({
    nombre: prenda?.nombre ?? '',
    descripcion: prenda?.descripcion ?? '',
    categoria: prenda?.categoria ?? 'vestidos',
    precio: prenda?.precio?.toString() ?? '',
    talles: (prenda?.talles as Talle[]) ?? [],
    activa: prenda?.activa ?? true,
  })
  const [imagenFile, setImagenFile] = useState<File | null>(null)
  const [imagenPreview, setImagenPreview] = useState<string>(prenda?.imagen_url ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Solo se aceptan imágenes JPG, PNG o WebP')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5MB')
      return
    }

    setError('')

    const compressed = await imageCompression(file, {
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    })

    setImagenFile(compressed)
    setImagenPreview(URL.createObjectURL(compressed))
  }

  function toggleTalle(talle: Talle) {
    setForm((prev) => ({
      ...prev,
      talles: prev.talles.includes(talle)
        ? prev.talles.filter((t) => t !== talle)
        : [...prev.talles, talle],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    let imagen_url = prenda?.imagen_url ?? ''

    if (imagenFile) {
      const ext = imagenFile.type.split('/')[1]
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('prendas')
        .upload(fileName, imagenFile, { contentType: imagenFile.type })

      if (uploadError) {
        setError('Error al subir la imagen. Intentá de nuevo.')
        setLoading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('prendas')
        .getPublicUrl(fileName)

      imagen_url = publicUrl

      if (prenda?.imagen_url) {
        const oldFileName = prenda.imagen_url.split('/').pop()
        if (oldFileName) {
          await supabase.storage.from('prendas').remove([oldFileName])
        }
      }
    }

    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria: form.categoria,
      precio: parseFloat(form.precio),
      talles: form.talles,
      imagen_url,
      activa: form.activa,
    }

    if (prenda) {
      const { error: updateError } = await supabase
        .from('prendas')
        .update(payload)
        .eq('id', prenda.id)

      if (updateError) {
        setError('Error al actualizar la prenda.')
        setLoading(false)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from('prendas')
        .insert(payload)

      if (insertError) {
        setError('Error al guardar la prenda.')
        setLoading(false)
        return
      }
    }

    router.push('/admin/catalogo')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {/* Imagen */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">
          Imagen de la prenda
        </Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-brand-border rounded-sm p-6 text-center cursor-pointer hover:border-gold transition-colors"
        >
          {imagenPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagenPreview} alt="Preview" className="max-h-48 mx-auto object-contain rounded" />
          ) : (
            <p className="font-sans text-sm text-foreground/40">
              Hacé click o arrastrá una imagen aquí
              <br />
              <span className="text-xs">JPG, PNG, WebP · Máx 5MB</span>
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">Nombre</Label>
        <Input
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          placeholder="Ej: Vestido floral Sicilia"
          className="border-brand-border font-sans text-sm"
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">Descripción</Label>
        <textarea
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          rows={3}
          placeholder="Descripción breve de la prenda..."
          className="w-full border border-brand-border rounded-sm px-3 py-2 font-sans text-sm bg-white focus:outline-none focus:border-gold resize-none"
        />
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">Categoría</Label>
        <select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value as Categoria })}
          className="w-full border border-brand-border rounded-sm px-3 py-2 font-sans text-sm bg-white focus:outline-none focus:border-gold capitalize"
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat} className="capitalize">{cat}</option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">Precio (UYU)</Label>
        <Input
          type="number"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
          min="0"
          step="0.01"
          placeholder="Ej: 1500"
          className="border-brand-border font-sans text-sm"
        />
      </div>

      {/* Talles */}
      <div className="space-y-2">
        <Label className="font-sans text-xs tracking-wider uppercase text-foreground/70">Talles disponibles</Label>
        <div className="flex gap-3">
          {TALLES.map((talle) => (
            <div key={talle} className="flex items-center gap-1.5">
              <Checkbox
                id={`talle-${talle}`}
                checked={form.talles.includes(talle)}
                onCheckedChange={() => toggleTalle(talle)}
              />
              <label htmlFor={`talle-${talle}`} className="font-sans text-sm cursor-pointer">
                {talle}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Activa */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="activa"
          checked={form.activa}
          onCheckedChange={(v) => setForm({ ...form, activa: !!v })}
        />
        <label htmlFor="activa" className="font-sans text-sm cursor-pointer">
          Visible en el catálogo (con stock)
        </label>
      </div>

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="font-sans text-xs border-brand-border"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-gold hover:bg-gold/90 text-white font-sans text-xs tracking-wider"
        >
          {loading ? 'Guardando...' : prenda ? 'Guardar cambios' : 'Agregar prenda'}
        </Button>
      </div>
    </form>
  )
}
