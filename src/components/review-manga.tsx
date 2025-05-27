"use client"

import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { api } from "@/trpc/react"
import { useSession } from "@supabase/auth-helpers-react"
import { StarIcon } from "lucide-react"
import { useState } from "react"

export function ReviewManga({
  mangaId,
  mangaTitle,
}: {
  mangaId: string
  mangaTitle: string
}) {
  const session = useSession()
  const utils = api.useUtils()

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const { data: review, isLoading: isLoadingReview } =
    api.review.getMangaReview.useQuery(
      {
        mangaId,
        userId: session?.user?.id ?? "",
      },
      {
        enabled: isReviewModalOpen,
      },
    )

  const [isHovering, setIsHovering] = useState(false)
  const [comment, setComment] = useState(review?.comment ?? "")
  const [rating, setRating] = useState(review?.rating ?? 0)

  const { mutate: upsertReview } = api.review.upsert.useMutation({
    onSuccess: () => {
      utils.review.getMangaReview.invalidate({
        mangaId,
        userId: session?.user?.id ?? "",
      })
    },
  })

  function handleSubmitReview() {
    upsertReview({
      mangaId,
      review: {
        userId: session?.user?.id ?? "",
        rating,
        comment,
      },
    })
  }

  return (
    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex-1"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <StarIcon
                  className={cn(
                    "h-5 w-5",
                    (isHovering || review) && "fill-yellow-500 text-yellow-500",
                  )}
                />
                <span className="sr-only">Review {mangaTitle}</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className={cn(isHovering && "opacity-100")}
          >
            <p>{review ? "Edit review" : `Review ${mangaTitle}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {mangaTitle}</DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Review {mangaTitle}
        </DialogDescription>

        <div className="bg-card mb-12 rounded-lg pt-4">
          <div
            className="mb-6"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <StarRating
              editable={!review || isHovering}
              size="lg"
              rating={rating}
              onChange={setRating}
            />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Write your review (optional)"
              className="min-h-32"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmitReview}>
            {review ? "Update Review" : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
