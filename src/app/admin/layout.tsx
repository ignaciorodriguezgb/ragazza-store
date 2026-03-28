import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Segunda capa de seguridad además del middleware
  await createSupabaseServerClient()

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
