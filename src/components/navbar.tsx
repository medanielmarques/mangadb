"use client"

import { ToggleTheme } from "@/components/toggle-theme"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signInWithDiscord, signOut } from "@/lib/supabase"
import { useSession } from "@supabase/auth-helpers-react"
import { BookOpen, LogOut, Menu, User } from "lucide-react"
import Link from "next/link"

// This would normally come from an authentication context

const user = {
  username: "mangafan123",
  avatarUrl: "/one-piece-cover.webp?height=32&width=32",
}

export default function Navbar() {
  const session = useSession()

  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
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
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
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

            <nav className="ml-10 hidden items-center gap-6 md:flex">
              <Link
                href="/"
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/browse"
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                Browse
              </Link>
              <Link
                href="/genres"
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                Genres
              </Link>
              <Link
                href="/rankings"
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                Rankings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.avatarUrl || "/one-piece-cover.webp"}
                        alt={user.username}
                      />

                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
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

                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <SignInDialog />
              </div>
            )}

            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  )
}

function SignInDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>

      <DialogContent closeButton={false}>
        <div className="px-4 py-8 sm:rounded-lg">
          <DialogTitle className="sr-only">Sign in</DialogTitle>

          <div className="animate-fade-in flex flex-col justify-center text-center">
            <span className="text-accent-foreground text-sm font-medium">
              Sign in with
            </span>

            <div className="mt-6 gap-3">
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={signInWithDiscord}
              >
                <span className="sr-only">Sign in with</span>

                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="discord"
                  className="svg-inline--fa fa-discord mr-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                  ></path>
                </svg>

                <span>Discord</span>
              </Button>
            </div>

            <p className="prose prose-sm text-muted-foreground mx-auto mt-6 max-w-[18rem] text-xs">
              By signing in, you agree to our{" "}
              <Link
                className="text-primary hover:underline"
                href="/info/terms-of-service"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="text-primary hover:underline"
                href="/info/privacy-policy"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
