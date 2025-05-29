import { StarRating } from "@/components/star-rating"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { api } from "@/trpc/react"
import { useEffect, useRef } from "react"

export function ChapterReviews({ chapterId }: { chapterId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    api.review.getAll.useInfiniteQuery(
      {
        chapterId,
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
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
        Loading reviews...
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Error loading reviews. Please try again later.
      </div>
    )
  }

  const reviews = data?.pages.flatMap((page) => page.items) ?? []

  if (reviews.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        No reviews yet. Be the first to review this chapter!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={review.users.avatarUrl ?? "/one-piece-cover.webp"}
                alt={review.users.username}
              />
            </Avatar>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-medium">{review.users.username}</span>
                <span className="text-muted-foreground text-xs">
                  {review.createdAt.toLocaleDateString()}
                </span>
              </div>

              <StarRating rating={review.rating} />

              <p className="mt-4 text-sm">{review.comment}</p>
            </div>
          </div>
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
