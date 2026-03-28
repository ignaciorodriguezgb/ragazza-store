import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ragazza Store — Moda Italiana',
  description: 'Catálogo de ropa italiana de mujer. Consultá por WhatsApp.',
  openGraph: {
    title: 'Ragazza Store',
    description: 'Moda italiana de mujer — consultá por WhatsApp',
    siteName: 'Ragazza Store',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
