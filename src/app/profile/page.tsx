import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MangaGrid } from "@/components/manga-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Settings, Star } from "lucide-react"

// This would normally come from an API or database
const userData = {
  id: "1",
  username: "mangafan123",
  avatarUrl: "/placeholder.svg?height=100&width=100",
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={userData.avatarUrl || "/placeholder.svg"} alt={userData.username} />
                <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle>{userData.username}</CardTitle>
              <CardDescription>Member since {new Date(userData.joinDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.mangaCount}</div>
                  <div className="text-sm text-muted-foreground">Manga</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.chaptersRead}</div>
                  <div className="text-sm text-muted-foreground">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.reviewsCount}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.round((userData.completed / userData.mangaCount) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Completion</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Currently Reading</span>
                    <span className="text-muted-foreground">{userData.currentlyReading}</span>
                  </div>
                  <Progress value={(userData.currentlyReading / userData.mangaCount) * 100} />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Completed</span>
                    <span className="text-muted-foreground">{userData.completed}</span>
                  </div>
                  <Progress value={(userData.completed / userData.mangaCount) * 100} />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Plan to Read</span>
                    <span className="text-muted-foreground">{userData.planToRead}</span>
                  </div>
                  <Progress value={(userData.planToRead / userData.mangaCount) * 100} />
                </div>
              </div>

              <Button variant="outline" className="w-full mt-6">
                <Settings className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="library" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="library">
                <BookOpen className="mr-2 h-4 w-4" /> Library
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <Star className="mr-2 h-4 w-4" /> Reviews
              </TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="library">
              <div className="flex gap-2 mb-6">
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
                <p className="text-muted-foreground text-center py-12">You haven&apos;t written any reviews yet.</p>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      Reading activity chart would go here
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Genre Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
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
