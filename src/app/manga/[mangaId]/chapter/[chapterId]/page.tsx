"use client"

import { ReviewList } from "@/components/review-list"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function ChapterPage({
  params,
}: {
  params: Promise<{ mangaId: string; chapterId: string }>
}) {
  const { mangaId, chapterId } = use(params)

  const { data: chapter } = api.chapter.getById.useQuery({
    id: chapterId,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/manga/${mangaId}`}
          className="text-primary flex items-center gap-1 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {chapter?.mangaTitle}
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold">
          Chapter {chapter?.number}: {chapter?.title}
        </h1>
        <div className="text-muted-foreground mb-4">
          Volume {chapter?.volumeNumber} • {chapter?.volumeTitle}
        </div>

        <div className="mb-6 flex items-center gap-4">
          <StarRating rating={chapter?.avgRating} />
          <span className="text-muted-foreground">
            {chapter?.avgRating}/10 ({chapter?.totalReviews} reviews)
          </span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
          </Button>
          <Button variant="outline">
            Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chapter Rating Section */}
      <div className="bg-card mb-12 rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Rate This Chapter</h2>
        <div className="mb-6">
          <StarRating editable size="lg" />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Write your review (optional)"
            className="min-h-32"
          />
        </div>
        <Button>Submit Rating</Button>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
        <ReviewList chapterId={chapterId} />
      </div>
    </div>
  )
}
