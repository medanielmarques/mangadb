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
import { toast } from "sonner"

export function ReviewManga({
  mangaId,
  mangaTitle,
}: {
  mangaId: string
  mangaTitle: string
}) {
  const session = useSession()
  const utils = api.useUtils()

  const { data: review, isLoading: isLoadingReview } =
    api.review.getMangaReview.useQuery(
      {
        mangaId,
        userId: session?.user?.id ?? "",
      },
      {
        refetchOnWindowFocus: false,
        enabled: !!session?.user,
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
      if (review) {
        toast.success("Review updated")
      } else {
        toast.success("Review submitted")
      }

      utils.review.getMangaReview.invalidate({
        mangaId,
        userId: session?.user?.id ?? "",
      })

      utils.review.getAll.invalidate()

      setIsReviewModalOpen(false)
    },
  })

  const { mutate: deleteReview } = api.review.delete.useMutation({
    onSuccess: () => {
      toast.success("Review deleted")

      utils.review.getMangaReview.invalidate({
        mangaId,
        userId: session?.user?.id ?? "",
      })

      utils.review.getAll.invalidate()

      setIsConfirmingDelete(false)
      setRating(0)
      setComment("")
      setIsReviewModalOpen(false)
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
                size="icon"
                className="flex-1 touch-none"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setIsReviewModalOpen(true)}
                disabled={!session?.user}
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
