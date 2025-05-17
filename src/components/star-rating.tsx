"use client"

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  rating?: number
  editable?: boolean
  size?: "sm" | "md" | "lg"
  onChange?: (rating: number) => void
}

export function StarRating({
  rating = 0,
  editable = false,
  size = "md",
  onChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)

  const handleClick = (index: number) => {
    if (!editable) return

    const newRating = index + 1
    setSelectedRating(newRating)
    onChange?.(newRating)
  }

  const displayRating = editable ? hoverRating || selectedRating : rating

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  }

  return (
    <div className="flex items-center">
      {[...(Array(10) as number[])].map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            "cursor-pointer transition-colors",
            index < displayRating
              ? "fill-yellow-500 text-yellow-500"
              : "text-muted-foreground",
          )}
          onClick={() => handleClick(index)}
          onMouseEnter={() => editable && setHoverRating(index + 1)}
          onMouseLeave={() => editable && setHoverRating(0)}
        />
      ))}
      {displayRating > 0 && (
        <span className="text-muted-foreground ml-2 text-sm">
          {displayRating.toFixed(0)}
        </span>
      )}
    </div>
  )
}
