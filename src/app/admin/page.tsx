'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/admin/catalogo')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <Image
              src="https://assets.cdn.filesafe.space/wqut8nAElrNZjsfF73RK/media/69c7fd24d4c304383e4eba5d.svg"
              alt="Ragazza Store"
              width={48}
              height={48}
              className="object-contain opacity-80"
              priority
            />
          </div>
          <p className="font-serif text-3xl font-light tracking-[0.22em] text-foreground leading-none">
            RAGAZZA
          </p>
          <p className="font-sans text-[9px] tracking-[0.5em] text-brand-rose uppercase mt-1">
            STORE · ADMIN
          </p>
          <div className="gold-line mx-auto mt-5" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-sans text-[10px] tracking-[0.25em] text-foreground/50 uppercase"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-brand-border bg-white font-sans text-sm h-11 focus-visible:ring-gold"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="font-sans text-[10px] tracking-[0.25em] text-foreground/50 uppercase"
            >
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-brand-border bg-white font-sans text-sm h-11 focus-visible:ring-gold"
            />
          </div>

          {error && (
            <p className="font-sans text-xs text-red-400 text-center tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
