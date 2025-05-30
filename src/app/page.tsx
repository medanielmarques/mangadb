import { MangaGrid } from "@/components/manga-grid"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Manga</h2>
        </div>
        <MangaGrid />
      </section>
    </div>
  )
}
