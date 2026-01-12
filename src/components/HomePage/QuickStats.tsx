export default function QuickStats() {
  const stats = [
    { value: "1.5+", label: "Years Experience" },
    { value: "5+", label: "Production Projects" },
    { value: "Next.js + MERN", label: "Core Stack" },
    { value: "Remote", label: "Available Worldwide" },
  ]

  return (
    <section className="py-16 md:py-24 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}