"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { api } from "@/trpc/react"
import { useSession } from "@supabase/auth-helpers-react"
import { HeartIcon } from "lucide-react"
import { useState } from "react"

export function FavoriteManga({ mangaId }: { mangaId: string }) {
  const utils = api.useUtils()

  const session = useSession()
  const userId = session?.user?.id

  const [isHovering, setIsHovering] = useState(false)

  const { data: isFavorite } = api.manga.isFavorite.useQuery(
    {
      mangaId,
      userId: userId ?? "",
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
  )

  const { mutate: favoriteMangaMutation } = api.manga.favorite.useMutation({
    onMutate: async () => {
      // Cancel any outgoing refetches
      await utils.manga.isFavorite.cancel({
        mangaId,
        userId: userId ?? "",
      })

      // Snapshot the previous value
      const previousIsFavorite = utils.manga.isFavorite.getData({
        mangaId,
        userId: userId ?? "",
      })

      // Optimistically update to the new value
      utils.manga.isFavorite.setData(
        {
          mangaId,
          userId: userId ?? "",
        },
        (old) => !old,
      )

      // Return a context object with the snapshotted value
      return { previousIsFavorite }
    },
    onError: (err, newTodo, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      utils.manga.isFavorite.setData(
        {
          mangaId,
          userId: userId ?? "",
        },
        context?.previousIsFavorite,
      )
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we're in sync with server
      void utils.manga.isFavorite.invalidate({
        mangaId,
        userId: userId ?? "",
      })
    },
  })

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
            onClick={() => {
              if (isFavorite) {
                favoriteMangaMutation({ mangaId, userId: userId ?? "" })
              } else {
                favoriteMangaMutation({ mangaId, userId: userId ?? "" })
              }
            }}
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
          <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
