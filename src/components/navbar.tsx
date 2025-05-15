"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Menu, Search, User } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// This would normally come from an authentication context
const isLoggedIn = false
const user = {
  username: "mangafan123",
  avatarUrl: "/placeholder.svg?height=32&width=32",
}

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <BookOpen className="h-5 w-5" />
                    <span>MangaDB</span>
                  </Link>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                  <Link href="/browse" className="hover:text-primary">
                    Browse
                  </Link>
                  <Link href="/genres" className="hover:text-primary">
                    Genres
                  </Link>
                  <Link href="/rankings" className="hover:text-primary">
                    Rankings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-5 w-5" />
              <span className="hidden md:inline-block">MangaDB</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 ml-10">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
                Browse
              </Link>
              <Link href="/genres" className="text-sm font-medium hover:text-primary transition-colors">
                Genres
              </Link>
              <Link href="/rankings" className="text-sm font-medium hover:text-primary transition-colors">
                Rankings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {showSearch ? (
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search manga..."
                  className="w-full pl-8"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <ModeToggle />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/library">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>My Library</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
