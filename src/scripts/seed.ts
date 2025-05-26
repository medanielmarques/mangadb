#!/usr/bin/env node
// This script sets up the database with test data
import { env } from "@/env"
import { seedDatabase } from "@/server/api/use-cases/seed-database"

// Ensure required environment variables are present
if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

async function main() {
  try {
    console.log("🌱 Starting database seed...")
    await seedDatabase()
    console.log("✅ Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

main()
