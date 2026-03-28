import { CATEGORIAS, type Categoria } from '@/types'

const CATEGORIA_CONFIG: Record<Categoria, { label: string; bg: string; textColor: string }> = {
  vestidos:    { label: 'Vestidos',    bg: 'linear-gradient(145deg, #F5E6D8 0%, #DEB89A 100%)', textColor: '#1C1917' },
  blusas:      { label: 'Blusas',      bg: 'linear-gradient(145deg, #EDE8F5 0%, #C4B8D6 100%)', textColor: '#1C1917' },
  pantalones:  { label: 'Pantalones',  bg: 'linear-gradient(145deg, #E8EDE5 0%, #B8C8B0 100%)', textColor: '#1C1917' },
  sacos:       { label: 'Sacos',       bg: 'linear-gradient(145deg, #1C1917 0%, #2E2826 100%)',  textColor: '#F8F4EF' },
  accesorios:  { label: 'Accesorios',  bg: 'linear-gradient(145deg, #F5EDD8 0%, #C9A84C 100%)', textColor: '#1C1917' },
}

export function CategoriasSection() {
  return (
    <section id="categorias" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-light text-[#1C1917]">Categorías</h2>
          <a href="/catalogo" className="font-sans text-[10px] tracking-[0.25em] text-[#1C1917]/40 hover:text-[#1C1917] uppercase transition-colors">
            Ver todo →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIAS.filter((cat) => cat !== 'accesorios').map((cat) => {
            const config = CATEGORIA_CONFIG[cat]
            return (
              <a
                key={cat}
                href={`/catalogo?categoria=${cat}`}
                className="group relative aspect-[3/4] overflow-hidden block"
                style={{ background: config.bg }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-5">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: config.textColor }}>
                    {config.label}
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-1 opacity-0 group-hover:opacity-60 transition-opacity duration-300" style={{ color: config.textColor }}>
                    Explorar →
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
