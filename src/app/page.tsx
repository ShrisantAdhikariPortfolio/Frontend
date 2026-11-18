import FeaturedProjects from '@/components/HomePage/FeaturedProjects'
import Hero from '@/components/HomePage/Hero'
import QuickStats from '@/components/HomePage/QuickStats'

export default function Home() {
  return (
    <main className="text-foreground min-h-screen">
      <Hero />

      <QuickStats />

      <FeaturedProjects />
    </main>
  )
}