'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <p className="font-serif text-3xl font-light tracking-[0.2em] text-foreground">RAGAZZA</p>
          <p className="font-sans text-xs tracking-[0.4em] text-brand-rose uppercase mt-1">STORE · ADMIN</p>
          <div className="w-8 h-[1px] bg-gold mx-auto mt-4" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-sans text-xs tracking-wider text-foreground/70 uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-brand-border bg-white font-sans text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-sans text-xs tracking-wider text-foreground/70 uppercase">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-brand-border bg-white font-sans text-sm"
            />
          </div>

          {error && (
            <p className="font-sans text-xs text-red-500 text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 text-white font-sans text-xs tracking-widest uppercase"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
