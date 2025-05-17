"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type React from "react"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="mx-auto w-full max-w-xl">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for manga, authors, genres..."
          className="bg-background/80 h-12 pl-10 backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="text-muted-foreground absolute top-3.5 left-3 h-5 w-5" />
        <Button type="submit" className="absolute top-1 right-1 h-10" size="sm">
          Search
        </Button>
      </div>
    </form>
  )
}
