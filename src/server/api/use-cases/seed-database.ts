import { db } from "@/server/db"
import { chapters, images, mangas, volumes } from "@/server/db/schema"
import fs from "fs"

async function clearDatabase() {
  // Delete in reverse order of dependencies
  await db.delete(images)
  await db.delete(chapters)
  await db.delete(volumes)
  await db.delete(mangas)
}

async function seedMangas() {
  const mangasList = JSON.parse(
    fs.readFileSync("src/data/seeds/mangas.json", "utf8"),
  )

  const parsedMangasList = mangasList.map((manga: any) => ({
    ...manga,
    publishedAt: manga.publishedAt ? new Date(manga.publishedAt) : null,
    completedAt: manga.completedAt ? new Date(manga.completedAt) : null,
  }))

  console.log("🌱 Seeding mangas...")
  return await db.insert(mangas).values(parsedMangasList).returning()
}

async function seedVolumes() {
  const volumesList = JSON.parse(
    fs.readFileSync("src/data/seeds/volumes.json", "utf8"),
  )

  const parsedVolumesList = volumesList.map((volume: any) => ({
    ...volume,
    publishedAtJapan: volume.publishedAtJapan
      ? new Date(volume.publishedAtJapan)
      : null,
    publishedAtUs: volume.publishedAtUs ? new Date(volume.publishedAtUs) : null,
    completedAt: volume.completedAt ? new Date(volume.completedAt) : null,
  }))

  console.log("🌱 Seeding volumes...")
  return await db.insert(volumes).values(parsedVolumesList).returning()
}

async function seedChapters() {
  const chaptersList = JSON.parse(
    fs.readFileSync("src/data/seeds/chapters.json", "utf8"),
  )

  const parsedChaptersList = chaptersList.map((chapter: any) => ({
    ...chapter,
    publishedAt: chapter.publishedAt ? new Date(chapter.publishedAt) : null,
  }))

  console.log("🌱 Seeding chapters...")
  return await db.insert(chapters).values(parsedChaptersList).returning()
}

async function seedImages() {
  const imagesList = JSON.parse(
    fs.readFileSync("src/data/seeds/images.json", "utf8"),
  )

  console.log("🌱 Seeding images...")
  return await db.insert(images).values(imagesList).returning()
}

export async function seedDatabase() {
  try {
    console.log("🧹 Clearing database...")
    await clearDatabase()

    await seedMangas()
    await seedVolumes()
    await seedChapters()
    await seedImages()

    console.log("✅ Database seeded successfully!")
    return "Database seeded successfully"
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}
