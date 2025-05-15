import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "./star-rating"
import { Button } from "./ui/button"
import { ThumbsDown, ThumbsUp } from "lucide-react"

// This would normally come from an API or database
const reviewData = [
  {
    id: "1",
    user: {
      id: "101",
      username: "mangafan123",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    rating: 9.5,
    content:
      "This chapter was absolutely amazing! The character development was on point, and the artwork was stunning. I can't wait to see what happens next.",
    date: "2023-05-15T14:30:00Z",
    likes: 42,
    dislikes: 3,
  },
  {
    id: "2",
    user: {
      id: "102",
      username: "otakumaster",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    rating: 8.0,
    content:
      "Good chapter overall, but I felt like the pacing was a bit off. Some scenes dragged on too long while others felt rushed. Still, the main plot twist at the end was worth it!",
    date: "2023-05-14T09:15:00Z",
    likes: 28,
    dislikes: 5,
  },
  {
    id: "3",
    user: {
      id: "103",
      username: "animelover99",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    rating: 7.5,
    content:
      "I had higher expectations for this chapter. The art was great as always, but the story didn't progress as much as I hoped. Looking forward to the next one though!",
    date: "2023-05-13T22:45:00Z",
    likes: 15,
    dislikes: 2,
  },
]

export function ReviewList({ chapterId }: { chapterId: string }) {
  if (reviewData.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No reviews yet. Be the first to review this chapter!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviewData.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={review.user.avatarUrl || "/placeholder.svg"} alt={review.user.username} />
              <AvatarFallback>{review.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{review.user.username}</span>
                <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-2 text-sm">{review.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{review.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span>{review.dislikes}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
