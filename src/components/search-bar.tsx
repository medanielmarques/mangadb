"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for manga, authors, genres..."
          className="pl-10 h-12 bg-background/80 backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        <Button type="submit" className="absolute right-1 top-1 h-10" size="sm">
          Search
        </Button>
      </div>
    </form>
  )
}
