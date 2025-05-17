import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { StarRating } from "./star-rating"

// This would normally come from an API or database
const volumeData = [
  {
    id: "1",
    number: 1,
    title: "Romance Dawn",
    coverImage: "/one-piece-cover.webp?height=200&width=150",
    releaseDate: "1997-12-24",
    chapters: [
      { id: "1", number: 1, title: "Romance Dawn", rating: 8.7 },
      { id: "2", number: 2, title: "They Call Him Luffy", rating: 8.5 },
      { id: "3", number: 3, title: "Morgan versus Luffy", rating: 8.6 },
      {
        id: "4",
        number: 4,
        title: "Marine Captain Axe-Hand Morgan",
        rating: 8.4,
      },
      {
        id: "5",
        number: 5,
        title: "Pirate King and Master Swordsman",
        rating: 8.9,
      },
    ],
  },
  {
    id: "2",
    number: 2,
    title: "Buggy the Clown",
    coverImage: "/one-piece-cover.webp?height=200&width=150",
    releaseDate: "1998-04-08",
    chapters: [
      { id: "6", number: 6, title: "The First Person", rating: 8.3 },
      { id: "7", number: 7, title: "Friends", rating: 8.4 },
      { id: "8", number: 8, title: "Introducing Nami", rating: 8.7 },
      { id: "9", number: 9, title: "Devil Woman", rating: 8.5 },
      { id: "10", number: 10, title: "The Incident at the Bar", rating: 8.6 },
    ],
  },
  {
    id: "3",
    number: 3,
    title: "Don't Get Fooled Again",
    coverImage: "/one-piece-cover.webp?height=200&width=150",
    releaseDate: "1998-06-04",
    chapters: [
      { id: "11", number: 11, title: "Take Flight", rating: 8.5 },
      { id: "12", number: 12, title: "Dog", rating: 8.7 },
      { id: "13", number: 13, title: "Treasure", rating: 8.8 },
      { id: "14", number: 14, title: "Reckless!!", rating: 8.6 },
      { id: "15", number: 15, title: "Gong", rating: 8.9 },
    ],
  },
]

export function VolumeList({ mangaId }: { mangaId: string }) {
  return (
    <div className="space-y-6">
      {volumeData.map((volume) => (
        <div key={volume.id} className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 flex items-center p-4">
            <div className="font-semibold">
              Volume {volume.number}: {volume.title}
            </div>
            <div className="text-muted-foreground ml-auto text-sm">
              {new Date(volume.releaseDate).toLocaleDateString()}
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`volume-${volume.id}`} className="border-0">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                Chapters
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  {volume.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/manga/${mangaId}/chapter/${chapter.id}`}
                      className="hover:bg-muted flex items-center rounded-md p-2 transition-colors"
                    >
                      <div className="mr-2">
                        <Badge variant="outline">{chapter.number}</Badge>
                      </div>
                      <div className="flex-1">{chapter.title}</div>
                      <StarRating rating={chapter.rating} size="sm" />
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  )
}
