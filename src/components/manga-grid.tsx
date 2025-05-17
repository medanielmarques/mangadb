import Image from "next/image"
import Link from "next/link"

import { StarRating } from "./star-rating"

// This would normally come from an API or database
const mangaData = [
  {
    id: "1",
    title: "One Piece",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 9.2,
  },
  {
    id: "2",
    title: "Berserk",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 9.5,
  },
  {
    id: "3",
    title: "Vagabond",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 9.3,
  },
  {
    id: "4",
    title: "Vinland Saga",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 9.0,
  },
  {
    id: "5",
    title: "Attack on Titan",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 8.9,
  },
  {
    id: "6",
    title: "Fullmetal Alchemist",
    coverImage: "/one-piece-cover.webp?height=300&width=200",
    rating: 9.1,
  },
]

export function MangaGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
      {mangaData.map((manga) => (
        <Link key={manga.id} href={`/manga/${manga.id}`} className="group">
          <div className="bg-muted relative mb-2 aspect-[2/3] overflow-hidden rounded-md">
            <Image
              src={manga.coverImage || "/one-piece-cover.webp"}
              alt={manga.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
            {manga.title}
          </h3>
          <StarRating rating={manga.rating} />
        </Link>
      ))}
    </div>
  )
}
