"use client"

import { FavoriteManga } from "@/components/favorite-manga"
import { ReviewManga } from "@/components/review-manga"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipContent } from "@/components/ui/tooltip"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"
import { VolumeList } from "@/components/volume-list"
import { api } from "@/trpc/react"
import { ShareIcon } from "lucide-react"
import Image from "next/image"
import { use, useState } from "react"
import { toast } from "sonner"

export default function MangaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: mangaId } = use(params)

  const { data: manga } = api.manga.getById.useQuery(
    { id: mangaId },
    {
      refetchOnWindowFocus: false,
    },
  )

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cover Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={manga?.coverArtUrl || "/one-piece-cover.webp"}
              alt={manga?.title || "Manga Cover"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <ReviewManga mangaId={mangaId} mangaTitle={manga?.title || ""} />

              <FavoriteManga mangaId={mangaId} />

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1"
                      onClick={handleShare}
                    >
                      <ShareIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent side="bottom">
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Manga Details */}
        <div className="md:col-span-2">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            {manga?.title}
          </h1>
          <div className="mb-4 flex items-center gap-4">
            <StarRating rating={manga?.avgRating || 0} />
            <span className="text-muted-foreground">
              {manga?.avgRating}/10 ({manga?.totalChapters} ratings)
            </span>
          </div>

          <div className="mb-6">
            <div className="mb-4 grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-muted-foreground">Author</div>
              <div>{manga?.authors}</div>

              <div className="text-muted-foreground">Artist</div>
              <div>{manga?.artists}</div>

              <div className="text-muted-foreground">Status</div>
              <div>{manga?.status}</div>

              <div className="text-muted-foreground">Start Date</div>
              <div>{manga?.releaseDate?.toLocaleDateString()}</div>

              <div className="text-muted-foreground">Volumes</div>
              <div>{manga?.totalVolumes}</div>

              <div className="text-muted-foreground">Chapters</div>
              <div>{manga?.totalChapters}</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">Synopsis</h2>
            <ReadMoreText text={manga?.description || ""} />
          </div>
        </div>
      </div>

      {/* Tabs for Volumes and Arcs */}
      <Tabs defaultValue="volumes" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-1">
          <TabsTrigger value="volumes">Volumes & Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="volumes">
          <VolumeList mangaId={mangaId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReadMoreText({
  text,
  wordLimit = 50,
}: {
  text: string
  wordLimit?: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const words = text?.split(" ") || []
  const shouldShowReadMore = words.length > wordLimit

  const displayText = isExpanded
    ? text
    : words.slice(0, wordLimit).join(" ") + (shouldShowReadMore ? "..." : "")

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">{displayText}</p>
      {shouldShowReadMore && (
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="pl-0"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  )
}
