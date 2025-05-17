import { ArcList } from "@/components/arc-list"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { VolumeList } from "@/components/volume-list"
import { BookmarkIcon, HeartIcon, ShareIcon } from "lucide-react"
import Image from "next/image"

// This would normally come from an API or database
const mangaData = {
  id: "1",
  title: "One Piece",
  coverImage: "/one-piece-cover.webp?height=600&width=400",
  author: "Eiichiro Oda",
  artist: "Eiichiro Oda",
  status: "Ongoing",
  rating: 9.2,
  ratingCount: 12453,
  genres: ["Action", "Adventure", "Comedy", "Fantasy", "Shounen"],
  synopsis:
    "Gol D. Roger, a man referred to as the 'Pirate King,' is set to be executed by the World Government. But just before his death, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new Pirate King.",
  startDate: "1997-07-22",
  volumes: 104,
  chapters: 1088,
}

export default function MangaPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cover Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={mangaData.coverImage || "/one-piece-cover.webp"}
              alt={mangaData.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button className="w-full">Add to Library</Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="flex-1">
                <BookmarkIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="flex-1">
                <HeartIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="flex-1">
                <ShareIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Manga Details */}
        <div className="md:col-span-2">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            {mangaData.title}
          </h1>
          <div className="mb-4 flex items-center gap-4">
            <StarRating rating={mangaData.rating} />
            <span className="text-muted-foreground">
              {mangaData.rating}/10 ({mangaData.ratingCount.toLocaleString()}{" "}
              ratings)
            </span>
          </div>

          <div className="mb-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {mangaData.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-muted-foreground">Author</div>
              <div>{mangaData.author}</div>
              <div className="text-muted-foreground">Artist</div>
              <div>{mangaData.artist}</div>
              <div className="text-muted-foreground">Status</div>
              <div>{mangaData.status}</div>
              <div className="text-muted-foreground">Start Date</div>
              <div>{new Date(mangaData.startDate).toLocaleDateString()}</div>
              <div className="text-muted-foreground">Volumes</div>
              <div>{mangaData.volumes}</div>
              <div className="text-muted-foreground">Chapters</div>
              <div>{mangaData.chapters}</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground">{mangaData.synopsis}</p>
          </div>

          <MangaRating mangaId={params.id} mangaTitle={mangaData.title} />
        </div>
      </div>

      {/* Tabs for Volumes and Arcs */}
      <Tabs defaultValue="volumes" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="volumes">Volumes & Chapters</TabsTrigger>
          <TabsTrigger value="arcs">Story Arcs</TabsTrigger>
        </TabsList>
        <TabsContent value="volumes">
          <VolumeList mangaId={params.id} />
        </TabsContent>
        <TabsContent value="arcs">
          <ArcList mangaId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MangaRating({
  mangaId,
  mangaTitle,
}: {
  mangaId: string
  mangaTitle: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review {mangaTitle}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {mangaTitle}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
