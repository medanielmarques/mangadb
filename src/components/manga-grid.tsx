"use client"

import { StarRating } from "@/components/star-rating"
import { api } from "@/trpc/react"
import Image from "next/image"
import Link from "next/link"

export function MangaGrid() {
  const { data: mangas } = api.manga.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
      {mangas?.map((manga) => (
        <Link key={manga.id} href={`/manga/${manga.id}`} className="group">
          <div className="bg-muted relative mb-2 aspect-[2/3] overflow-hidden rounded-md">
            <Image
              src={manga.coverArtUrl}
              alt={manga.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
            {manga.title}
          </h3>
          <StarRating rating={manga.avgRating} />
        </Link>
      ))}
    </div>
  )
}
