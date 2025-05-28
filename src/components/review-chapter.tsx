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
import { StarIcon, Trash } from "lucide-react"
import { useEffect, useState } from "react"

export function ReviewChapter({
  chapterId,
  chapterTitle,
  chapterNumber,
}: {
  chapterId: string
  chapterTitle: string
  chapterNumber: number
}) {
  const session = useSession()
  const utils = api.useUtils()

  const { data: review, isLoading: isLoadingReview } =
    api.review.getChapterReview.useQuery(
      {
        chapterId,
        userId: session?.user?.id ?? "",
      },
      {
        refetchOnWindowFocus: false,
      },
    )

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  useEffect(() => {
    if (review) {
      setComment(review.comment ?? "")
      setRating(review.rating)
    }
  }, [review])

  const { mutate: upsertReview } = api.review.upsert.useMutation({
    onSuccess: () => {
      utils.review.getChapterReview.invalidate({
        chapterId,
        userId: session?.user?.id ?? "",
      })
    },
  })

  const { mutate: deleteReview } = api.review.delete.useMutation({
    onSuccess: () => {
      utils.review.getChapterReview.invalidate({
        chapterId,
        userId: session?.user?.id ?? "",
      })
      setIsConfirmingDelete(false)
      setRating(0)
      setComment("")
      setIsReviewModalOpen(false)
    },
  })

  function handleSubmitReview() {
    upsertReview({
      chapterId,
      review: {
        userId: session?.user?.id ?? "",
        rating,
        comment,
      },
    })
  }

  function handleDeleteReview() {
    deleteReview(review?.id ?? "")
  }

  return (
    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <StarIcon
                  className={cn(
                    "h-5 w-5",
                    (isHovering || review) && "fill-yellow-500 text-yellow-500",
                  )}
                />

                <span>{review ? "Edit review" : "Review"}</span>

                <span className="sr-only">
                  Review {chapterNumber} - {chapterTitle}
                </span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className={cn(isHovering && "opacity-100")}
          >
            <p>{review ? "Edit review" : "Review Chapter"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Review Chapter {chapterNumber} - {chapterTitle}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Review Chapter {chapterNumber} - {chapterTitle}
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

          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={handleSubmitReview}
              disabled={isLoadingReview}
            >
              {review ? "Update Review" : "Submit Review"}
            </Button>

            {!isConfirmingDelete ? (
              <Button
                variant="outline"
                disabled={isLoadingReview || !review}
                onClick={() => setIsConfirmingDelete(true)}
              >
                <Trash />
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleDeleteReview}>
                Confirm
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
