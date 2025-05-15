import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ReviewList } from "@/components/review-list"

// This would normally come from an API or database
const chapterData = {
  id: "101",
  mangaId: "1",
  mangaTitle: "One Piece",
  title: "Romance Dawn",
  number: 1,
  volume: 1,
  releaseDate: "1997-07-22",
  rating: 8.7,
  ratingCount: 9876,
}

export default function ChapterPage({
  params,
}: {
  params: { id: string; chapterId: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/manga/${params.id}`} className="text-primary hover:underline flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to {chapterData.mangaTitle}
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Chapter {chapterData.number}: {chapterData.title}
        </h1>
        <div className="text-muted-foreground mb-4">
          Volume {chapterData.volume} • Released {new Date(chapterData.releaseDate).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <StarRating rating={chapterData.rating} />
          <span className="text-muted-foreground">
            {chapterData.rating}/10 ({chapterData.ratingCount.toLocaleString()} ratings)
          </span>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
          </Button>
          <Button variant="outline">
            Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chapter Rating Section */}
      <div className="bg-card rounded-lg p-6 mb-12 border">
        <h2 className="text-xl font-semibold mb-4">Rate This Chapter</h2>
        <div className="mb-6">
          <StarRating editable size="lg" />
        </div>
        <div className="mb-4">
          <Textarea placeholder="Write your review (optional)" className="min-h-32" />
        </div>
        <Button>Submit Rating</Button>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <ReviewList chapterId={params.chapterId} />
      </div>
    </div>
  )
}
