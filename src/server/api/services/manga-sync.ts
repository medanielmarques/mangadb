import { createMangaUseCase } from "@/server/api/use-cases/manga/create-manga"
import { TRPCError } from "@trpc/server"

const MANGADEX_API_BASE_URL = "https://api.mangadex.org"

async function getMangaCover(mangaId: string, coverId: string) {
  return await fetch(`${MANGADEX_API_BASE_URL}/covers/${mangaId}/${coverId}`)
}

export async function getMangaDetails(mangaId: string) {
  const response = await fetch(
    `${MANGADEX_API_BASE_URL}/manga/${mangaId}?includes[]=author&includes[]=artist&includes[]=cover_art&includes[]=publisher`,
  )

  if (!response.ok) {
    console.error(response)
    throw new Error(`Failed to fetch manga details: ${response.statusText}`)
  }

  const json = await response.json()
  const manga = json.data

  if (!manga?.relationships) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Invalid manga data received from MangaDex API",
    })
  }

  const authors = manga.relationships
    .filter((rel: any) => rel?.type === "author")
    .map((rel: any) => rel?.attributes?.name || "Unknown Author")

  const artists = manga.relationships
    .filter((rel: any) => rel?.type === "artist")
    .map((rel: any) => rel?.attributes?.name || "Unknown Artist")

  const genres = manga.relationships
    .filter(
      (rel: any) => rel?.type === "tag" && rel?.attributes?.group === "genre",
    )
    .map((rel: any) => rel?.attributes?.name)
    .filter(Boolean)

  const themes = manga.relationships
    .filter(
      (rel: any) => rel?.type === "tag" && rel?.attributes?.group === "theme",
    )
    .map((rel: any) => rel?.attributes?.name)
    .filter(Boolean)

  const publishers = manga.relationships
    .filter((rel: any) => rel?.type === "publisher")
    .map((rel: any) => rel?.attributes?.name || "Unknown Publisher")

  const coverArt = manga.relationships
    .filter((rel: any) => rel?.type === "cover_art")
    .map((rel: any) => rel?.attributes?.fileName)
    .filter(Boolean)

  function getDemographic(demographic: string) {
    if (demographic === "shounen") return "shonen"
    return demographic
  }

  const mangaData = {
    title:
      manga.attributes?.title?.en ||
      Object.values(manga.attributes?.altTitles || {})[0] ||
      "Unknown Title",
    description: manga.attributes?.description?.en || "",
    authors,
    artists,
    status: manga.attributes?.status || "unknown",
    demographic: getDemographic(manga.attributes?.publicationDemographic),
    genres,
    themes,
    format: manga.attributes?.contentRating || "unknown",
    publishers,
    coverArt,
    publishedAt: manga.attributes?.year || null,
    completedAt:
      manga.attributes?.status === "completed"
        ? manga.attributes?.updatedAt
        : null,
  }

  await createMangaUseCase({
    title: mangaData.title,
    description: mangaData.description,
    authors: mangaData.authors,
    status: mangaData.status,
    artists: mangaData.artists,
    demographic: mangaData.demographic as
      | "shonen"
      | "shoujo"
      | "josei"
      | "seinen"
      | "kodomo",
    genres: mangaData.genres,
    themes: mangaData.themes,
    publishers: mangaData.publishers,
    publishedAt: mangaData.publishedAt
      ? new Date(mangaData.publishedAt, 0, 1)
      : new Date(),
    completedAt: mangaData.completedAt,
  })

  return mangaData
}

export async function syncManga() {
  try {
    const MangaName = await getMangaDetails("[manga-id]")

    return "Sync completed successfully"
  } catch (error) {
    console.error("Error syncing manga:", error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to sync manga data",
      cause: error,
    })
  }
}
