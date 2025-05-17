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
import { StarIcon } from "lucide-react"
import { useState } from "react"

export function ReviewManga({
  mangaId,
  mangaTitle,
}: {
  mangaId: string
  mangaTitle: string
}) {
  const [isHovering, setIsHovering] = useState(false)

  const hasReview = false

  return (
    <Dialog>
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
                    (isHovering || hasReview) &&
                      "fill-yellow-500 text-yellow-500",
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
            <p>Review {mangaTitle}</p>
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
          <div className="mb-6">
            <StarRating editable size="lg" />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Write your review (optional)"
              className="min-h-32"
            />
          </div>
          <Button>Submit Review</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
