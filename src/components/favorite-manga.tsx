"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { useState } from "react"

export function FavoriteManga() {
  const [isHovering, setIsHovering] = useState(false)

  const isFavorite = false

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex-1"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <HeartIcon
              className={cn(
                "h-5 w-5",
                (isHovering || isFavorite) && "fill-red-500 text-red-500",
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Favorite</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
