import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { CategoriasSection } from '@/components/CategoriasSection'
import { ContactoSection } from '@/components/ContactoSection'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <CategoriasSection />
      <ContactoSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
