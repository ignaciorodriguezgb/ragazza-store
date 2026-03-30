export type Categoria = 'vestidos' | 'blusas' | 'pantalones' | 'sacos' | 'buzos'
export type Talle = 'XS' | 'S' | 'M' | 'L' | 'XL'

export interface Prenda {
  id: string
  nombre: string
  descripcion: string
  categoria: Categoria
  precio: number
  talles: Talle[]
  imagen_url: string
  activa: boolean
  created_at: string
  updated_at: string
}

export const CATEGORIAS: Categoria[] = ['vestidos', 'blusas', 'pantalones', 'sacos', 'buzos']
export const TALLES: Talle[] = ['XS', 'S', 'M', 'L', 'XL']
export const WHATSAPP_NUMBER = '59894485929'
