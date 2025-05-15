import Image from "next/image"
import Link from "next/link"
import { StarRating } from "./star-rating"

// This would normally come from an API or database
const mangaData = [
  {
    id: "1",
    title: "One Piece",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 9.2,
  },
  {
    id: "2",
    title: "Berserk",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 9.5,
  },
  {
    id: "3",
    title: "Vagabond",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 9.3,
  },
  {
    id: "4",
    title: "Vinland Saga",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 9.0,
  },
  {
    id: "5",
    title: "Attack on Titan",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 8.9,
  },
  {
    id: "6",
    title: "Fullmetal Alchemist",
    coverImage: "/placeholder.svg?height=300&width=200",
    rating: 9.1,
  },
]

export function MangaGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {mangaData.map((manga) => (
        <Link key={manga.id} href={`/manga/${manga.id}`} className="group">
          <div className="relative aspect-[2/3] rounded-md overflow-hidden mb-2 bg-muted">
            <Image
              src={manga.coverImage || "/placeholder.svg"}
              alt={manga.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{manga.title}</h3>
          <StarRating rating={manga.rating} />
        </Link>
      ))}
    </div>
  )
}
