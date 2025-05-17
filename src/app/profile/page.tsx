import { MangaGrid } from "@/components/manga-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Settings, Star } from "lucide-react"

// This would normally come from an API or database
const userData = {
  id: "1",
  username: "mangafan123",
  avatarUrl: "/one-piece-cover.webp?height=100&width=100",
  joinDate: "2023-01-15",
  mangaCount: 142,
  chaptersRead: 3567,
  reviewsCount: 87,
  currentlyReading: 12,
  completed: 78,
  planToRead: 52,
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="mx-auto mb-4 h-24 w-24">
                <AvatarImage
                  src={userData.avatarUrl || "/one-piece-cover.webp"}
                  alt={userData.username}
                />
                <AvatarFallback>
                  {userData.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{userData.username}</CardTitle>
              <CardDescription>
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {userData.mangaCount}
                  </div>
                  <div className="text-muted-foreground text-sm">Manga</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {userData.chaptersRead}
                  </div>
                  <div className="text-muted-foreground text-sm">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {userData.reviewsCount}
                  </div>
                  <div className="text-muted-foreground text-sm">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (userData.completed / userData.mangaCount) * 100,
                    )}
                    %
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Completion
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Currently Reading</span>
                    <span className="text-muted-foreground">
                      {userData.currentlyReading}
                    </span>
                  </div>
                  <Progress
                    value={
                      (userData.currentlyReading / userData.mangaCount) * 100
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="text-muted-foreground">
                      {userData.completed}
                    </span>
                  </div>
                  <Progress
                    value={(userData.completed / userData.mangaCount) * 100}
                  />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Plan to Read</span>
                    <span className="text-muted-foreground">
                      {userData.planToRead}
                    </span>
                  </div>
                  <Progress
                    value={(userData.planToRead / userData.mangaCount) * 100}
                  />
                </div>
              </div>

              <Button variant="outline" className="mt-6 w-full">
                <Settings className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="library" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="library">
                <BookOpen className="mr-2 h-4 w-4" /> Library
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <Star className="mr-2 h-4 w-4" /> Reviews
              </TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="library">
              <div className="mb-6 flex gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  All
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                  Currently Reading
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Completed
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Plan to Read
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  On Hold
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Dropped
                </Badge>
              </div>
              <MangaGrid />
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                {/* This would be a list of reviews */}
                <p className="text-muted-foreground py-12 text-center">
                  You haven&apos;t written any reviews yet.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                      Reading activity chart would go here
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Genre Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                      Genre distribution chart would go here
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
