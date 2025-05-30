import { db } from "@/server/db"
import {
  chapters,
  images,
  mangaFavorites,
  mangas,
  reviews,
  users,
  volumes,
} from "@/server/db/schema"
import fs from "fs"

async function clearDatabase() {
  // Delete in reverse order of dependencies
  await db.delete(mangaFavorites)
  await db.delete(images)
  await db.delete(reviews)
  await db.delete(chapters)
  await db.delete(volumes)
  await db.delete(mangas)
  await db.delete(users)
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

async function seedUsers() {
  const usersList = JSON.parse(
    fs.readFileSync("src/data/seeds/users.json", "utf8"),
  )

  console.log("🌱 Seeding users...")
  return await db.insert(users).values(usersList).returning()
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

async function seedReviews() {
  const mangaReviewsList = JSON.parse(
    fs.readFileSync("src/data/seeds/manga-reviews.json", "utf8"),
  )

  const chapterReviewsList = JSON.parse(
    fs.readFileSync("src/data/seeds/chapter-reviews.json", "utf8"),
  )

  const mangaReviews = mangaReviewsList.map((review: any) => ({
    ...review,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ), // Random date within last 30 days
  }))

  const chapterReviews = chapterReviewsList.map((review: any) => ({
    ...review,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ), // Random date within last 30 days
  }))

  console.log("🌱 Seeding reviews...")
  return await db
    .insert(reviews)
    .values([...mangaReviews, ...chapterReviews])
    .returning()
}

export async function seedDatabase() {
  try {
    console.log("🧹 Clearing database...")
    await clearDatabase()

    await seedUsers()
    await seedMangas()
    await seedVolumes()
    await seedChapters()
    await seedImages()
    await seedReviews()

    console.log("✅ Database seeded successfully!")
    return "Database seeded successfully"
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}
