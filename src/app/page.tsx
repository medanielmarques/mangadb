import { MangaGrid } from "@/components/manga-grid"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trending Manga Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Manga</h2>
          <a href="#" className="text-primary hover:underline">
            View All
          </a>
        </div>
        <MangaGrid />
      </section>

      {/* Recently Updated Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recently Updated</h2>
          <a href="#" className="text-primary hover:underline">
            View All
          </a>
        </div>
        <MangaGrid />
      </section>

      {/* Top Rated Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Top Rated</h2>
          <a href="#" className="text-primary hover:underline">
            View All
          </a>
        </div>
        <MangaGrid />
      </section>
    </div>
  )
}
