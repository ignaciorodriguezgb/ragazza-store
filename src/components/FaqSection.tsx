'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    pregunta: '¿Cómo hago una consulta o pedido?',
    respuesta: 'Todo se gestiona directamente por WhatsApp. Hacé click en el botón "Consultar por WhatsApp" en la prenda que te interesa, o escribinos directamente al +598 944 85929. Te respondemos a la brevedad con disponibilidad, talles y formas de entrega.',
  },
  {
    pregunta: '¿Qué talles tienen disponibles?',
    respuesta: 'Manejamos talles XS, S, M, L y XL. Cada prenda tiene los talles disponibles indicados. Si necesitás asesoramiento para elegir tu talle, no dudes en consultarnos.',
  },
  {
    pregunta: '¿Hacen envíos?',
    respuesta: 'Sí, realizamos envíos a todo el país. Para Montevideo coordinamos entrega o envío por mensajería. Para el interior usamos servicios de paquetería. Consultanos por WhatsApp para coordinar.',
  },
  {
    pregunta: '¿Puedo cambiar o devolver una prenda?',
    respuesta: 'Aceptamos cambios dentro de los 7 días de recibida la prenda, siempre que esté en perfecto estado, sin uso y con etiquetas. No hacemos devoluciones en efectivo, solo cambio por otra prenda o crédito.',
  },
  {
    pregunta: '¿Cuáles son los métodos de pago?',
    respuesta: 'Aceptamos transferencia bancaria, depósito, y efectivo para entregas en mano. Consultanos por las opciones disponibles al momento de tu pedido.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-[#F8F4EF] py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-5">

        {/* Heading */}
        <div className="mb-10">
          <p className="font-sans text-[10px] tracking-[0.3em] text-[#D4788C] uppercase mb-3">
            Información
          </p>
          <h2 className="font-serif text-3xl font-light text-[#1C1917]">
            Preguntas frecuentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#E2D9CF]">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-sans text-sm tracking-wide text-[#1C1917] group-hover:text-[#C9A84C] transition-colors pr-4">
                  {faq.pregunta}
                </span>
                <span className="shrink-0 text-[#1C1917]/40 group-hover:text-[#C9A84C] transition-colors">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {open === i && (
                <div className="pb-5">
                  <p className="font-sans text-sm text-[#1C1917]/60 leading-relaxed">
                    {faq.respuesta}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
