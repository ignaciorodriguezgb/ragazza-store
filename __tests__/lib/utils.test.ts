import { formatPrecio, buildWhatsAppUrl } from '@/lib/appUtils'

describe('formatPrecio', () => {
  it('formats integer price with UYU symbol', () => {
    expect(formatPrecio(1500)).toBe('$ 1.500')
  })
  it('formats price with zero decimals, omits .00', () => {
    expect(formatPrecio(1500.00)).toBe('$ 1.500')
  })
  it('formats zero', () => {
    expect(formatPrecio(0)).toBe('$ 0')
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds correct WhatsApp URL', () => {
    const url = buildWhatsAppUrl('Vestido floral')
    // encodeURIComponent does NOT encode '!' (RFC-allowed), encodes spaces as %20, quotes as %22
    expect(url).toBe(
      'https://wa.me/59894485929?text=Hola!%20Me%20interesa%20la%20prenda%20%22Vestido%20floral%22'
    )
  })
  it('encodes special characters in prenda name', () => {
    const url = buildWhatsAppUrl('Blusa & falda')
    expect(url).toContain(encodeURIComponent('Blusa & falda'))
  })
})
