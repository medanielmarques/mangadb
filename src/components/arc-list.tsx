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
const arcData = [
  {
    id: "1",
    title: "East Blue Saga",
    description: "The beginning of Luffy's journey to become the Pirate King.",
    chapters: [
      { id: "1", number: 1, title: "Romance Dawn", rating: 8.7 },
      { id: "2", number: 2, title: "They Call Him Luffy", rating: 8.5 },
      { id: "3", number: 3, title: "Morgan versus Luffy", rating: 8.6 },
      // More chapters...
    ],
  },
  {
    id: "2",
    title: "Alabasta Saga",
    description:
      "The Straw Hat Pirates journey to Alabasta to help Princess Vivi.",
    chapters: [
      { id: "101", number: 101, title: "Reverse Mountain", rating: 8.9 },
      {
        id: "102",
        number: 102,
        title: "Now, the Adventure Begins",
        rating: 8.8,
      },
      {
        id: "103",
        number: 103,
        title: "Mr. 9 and Miss Wednesday",
        rating: 8.7,
      },
      // More chapters...
    ],
  },
  {
    id: "3",
    title: "Sky Island Saga",
    description:
      "The Straw Hat Pirates journey to a mysterious island in the sky.",
    chapters: [
      { id: "201", number: 201, title: "Knock Up Stream", rating: 9.1 },
      { id: "202", number: 202, title: "Where the Island Waits", rating: 9.0 },
      { id: "203", number: 203, title: "Angel Beach", rating: 8.9 },
      // More chapters...
    ],
  },
]

export function ArcList({ mangaId }: { mangaId: string }) {
  return (
    <div className="space-y-6">
      {arcData.map((arc) => (
        <div key={arc.id} className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 p-4">
            <h3 className="text-lg font-semibold">{arc.title}</h3>
            <p className="text-muted-foreground text-sm">{arc.description}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`arc-${arc.id}`} className="border-0">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                Chapters
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  {arc.chapters.map((chapter) => (
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
