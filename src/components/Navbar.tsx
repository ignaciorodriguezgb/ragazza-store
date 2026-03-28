import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-center border-b border-brand-border bg-background sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Image
          src="https://assets.cdn.filesafe.space/wqut8nAElrNZjsfF73RK/media/69c7fd24d4c304383e4eba5d.svg"
          alt="Ragazza Store"
          width={48}
          height={48}
          className="object-contain"
        />
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-light tracking-[0.2em] text-foreground leading-none">
            RAGAZZA
          </span>
          <span className="font-sans text-xs tracking-[0.35em] text-brand-rose uppercase">
            STORE
          </span>
        </div>
      </div>
    </nav>
  )
}
