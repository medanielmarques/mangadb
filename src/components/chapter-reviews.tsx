import { StarRating } from "@/components/star-rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { api } from "@/trpc/react"

export function ChapterReviews({ chapterId }: { chapterId: string }) {
  const { data: reviews } = api.review.getAll.useQuery(
    {
      chapterId,
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  if (reviews?.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        No reviews yet. Be the first to review this chapter!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews?.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={review.users.avatarUrl || "/one-piece-cover.webp"}
                alt={review.users.username}
              />
              {/* <AvatarFallback>
                {review.users.username.slice(0, 2).toUpperCase()}
              </AvatarFallback> */}
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
    </div>
  )
}
