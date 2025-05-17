import { MangaGrid } from "@/components/manga-grid"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <section className="relative mb-12 overflow-hidden rounded-xl py-20">
        <div className="from-primary/20 to-primary/5 absolute inset-0 z-0 bg-gradient-to-r" />
        <div className="absolute inset-0 z-[-1] bg-[url('/zoro.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Discover and Track Your Favorite Manga
          </h1>
          <p className="text-muted-foreground mb-8 text-lg md:text-xl">
            Your personal manga library, ratings, and reading progress all in
            one place
          </p>
          <SearchBar />
        </div>
      </section>

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
