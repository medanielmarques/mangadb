import { StarRating } from "@/components/star-rating"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { api } from "@/trpc/react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function VolumeList({ mangaId }: { mangaId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    api.volume.getVolumesWithChapters.useInfiniteQuery(
      { mangaId },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
        refetchOnWindowFocus: false,
      },
    )

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (status === "pending") {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Loading volumes...
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Error loading volumes. Please try again later.
      </div>
    )
  }

  const volumes = data?.pages.flatMap((page) => page.items) ?? []

  if (volumes.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        No volumes found.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {volumes.map((volume) => (
        <div key={volume.id} className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 flex items-center p-4">
            <div className="font-semibold">
              Volume {volume.number}: {volume.title}
            </div>
            <div className="text-muted-foreground ml-auto text-sm">
              {volume.publishedAtJapan?.toLocaleDateString()}
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`volume-${volume.id}`} className="border-0">
              <AccordionTrigger className="cursor-pointer px-4 py-2 hover:no-underline">
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
                      <StarRating rating={chapter.avgRating ?? 0} size="sm" />
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      <div ref={loadMoreRef} className="h-4 w-full">
        {isFetchingNextPage && (
          <div className="text-muted-foreground text-center">
            Loading more...
          </div>
        )}
      </div>
    </div>
  )
}
