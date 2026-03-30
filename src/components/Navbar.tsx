'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Contáctanos', href: '/#contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white ${
        scrolled || menuOpen ? 'border-b border-[#E8E3DD]' : 'border-b border-[#E8E3DD]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-5 h-[64px] md:h-[80px] flex items-center justify-between md:grid md:grid-cols-3">

        {/* Left: brand text */}
        <a href="/" className="flex items-center">
          <div>
            <p className="font-serif text-[1rem] md:text-[1.4rem] font-light tracking-[0.2em] text-[#1C1917] leading-none">
              RAGAZZA
            </p>
            <p className="font-sans text-[7px] md:text-[9px] tracking-[0.4em] text-[#D4788C] uppercase leading-none mt-[2px] md:mt-[3px]">
              STORE
            </p>
          </div>
        </a>

        {/* Center: logo — solo desktop */}
        <div className="hidden md:flex justify-center">
          <a href="/">
            <Image
              src="https://assets.cdn.filesafe.space/qPoL6jo2aF8oNgys3rFq/media/69c80f3f89c100f412f11fda.svg"
              alt="Ragazza Store"
              width={48}
              height={48}
              className="object-contain md:w-[68px] md:h-[68px]"
              priority
            />
          </a>
        </div>

        {/* Right: nav links + mobile toggle */}
        <div className="flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-[11px] tracking-[0.18em] text-[#1C1917]/60 hover:text-[#1C1917] uppercase transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden p-1 text-[#1C1917]/50 hover:text-[#1C1917]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E3DD] px-5 py-5 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-[11px] tracking-[0.22em] text-[#1C1917]/70 uppercase"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
