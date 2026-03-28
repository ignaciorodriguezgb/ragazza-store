import { WHATSAPP_NUMBER } from '@/types'

export function formatPrecio(precio: number): string {
  const formatted = new Intl.NumberFormat('es-UY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(precio)
  return `$ ${formatted}`
}

export function buildWhatsAppUrl(nombrePrenda: string): string {
  const text = `Hola! Me interesa la prenda "${nombrePrenda}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
