import * as cheerio from "cheerio"
import fs from "fs"

const INPUT_FILE = "src/one-piece-volumes.html"
const OUTPUT_VOLUMES_FILE = "@/data/one-piece-volumes.json"
const OUTPUT_CHAPTERS_FILE = "@/data/one-piece-chapters.json"

type Volume = {
  volumeTitle: string
  volumeNumber: number
  isbnJapan: string
  isbnUs: string
  pagesInJapanVersion: number
  pagesInUsVersion: number
  releaseDateInJapan: string
  releaseDateInUs: string
  firstChapter: number
  lastChapter: number
  coverArtUrl: string
}

type Chapter = {
  chapterTitleEnglish: string
  chapterTitleJapanese: string
  chapterNumber: number
  volumeNumber: number
}

function cleanCoverArtUrl(url: string | undefined): string {
  if (!url) return ""
  return url
    .replace("/scale-to-width-down/170", "")
    .replace("/revision/latest", "/revision/latest")
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr.split("[")[0]?.trim() ?? "")
  if (isNaN(date.getTime())) return ""
  return date.toISOString().split("T")[0] ?? ""
}

function extractChapterNumber(text: string): number {
  return parseInt(text.split(".")[0] ?? "") || 0
}

function extractVolumeData(
  $table: cheerio.Cheerio<T>,
  volumeNumber: number,
): Volume {
  const japanRow = $table.find("tr").eq(2)
  const usRow = $table.find("tr").eq(3)
  const chaptersList = $table.find("ul").first()
  let coverArtUrl = cleanCoverArtUrl($table.find("img").first().attr("src"))

  if (coverArtUrl.includes("data:image")) {
    coverArtUrl = cleanCoverArtUrl($table.find("img").first().attr("data-src"))
  }

  const firstChapter = extractChapterNumber(
    chaptersList.find("li").first().text(),
  )
  const lastChapter = extractChapterNumber(
    chaptersList.find("li").last().text(),
  )

  return {
    volumeTitle: usRow.find("td").eq(0).text().trim(),
    volumeNumber,
    isbnJapan: japanRow.find("td").eq(3).text().trim(),
    isbnUs: usRow.find("td").eq(3).text().trim(),
    pagesInJapanVersion: parseInt(japanRow.find("td").eq(2).text().trim()),
    pagesInUsVersion: parseInt(usRow.find("td").eq(2).text().trim()),
    releaseDateInJapan: formatDate(japanRow.find("td").eq(1).text().trim()),
    releaseDateInUs: formatDate(usRow.find("td").eq(1).text().trim()),
    firstChapter,
    lastChapter,
    coverArtUrl,
  }
}

function extractChapterData(
  chapterText: string,
  volumeNumber: number,
): Chapter | null {
  const titleMatch = chapterText.match(/(\d+)\.\s+(.*?)\s+\((.*?)\)/)
  if (!titleMatch) return null

  return {
    chapterTitleEnglish: titleMatch[2]?.trim() ?? "",
    chapterTitleJapanese: titleMatch[3]?.trim() ?? "",
    chapterNumber: extractChapterNumber(chapterText),
    volumeNumber,
  }
}

function writeOutputFile(filePath: string, data: unknown): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error)
    throw error
  }
}

try {
  const html = fs.readFileSync(INPUT_FILE, "utf8")
  const $ = cheerio.load(html)

  const volumes: Volume[] = []
  const chapters: Chapter[] = []

  // Process each volume table
  $('table[id^="Volume_"]').each((_, volumeTable) => {
    const $table = $(volumeTable)
    const volumeNumber = parseInt(
      $table.attr("id")?.replace("Volume_", "") ?? "0",
    )

    const volume = extractVolumeData($table, volumeNumber)
    volumes.push(volume)

    // Process chapters in this volume
    $table
      .find("ul")
      .first()
      .find("li")
      .each((_, chapterItem) => {
        const chapterText = $(chapterItem).text()
        const chapter = extractChapterData(chapterText, volumeNumber)
        if (chapter) {
          chapters.push(chapter)
        }
      })
  })

  volumes.sort((a, b) => a.volumeNumber - b.volumeNumber)
  chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)

  writeOutputFile(OUTPUT_VOLUMES_FILE, volumes)
  writeOutputFile(OUTPUT_CHAPTERS_FILE, chapters)

  console.log(
    `Processed ${volumes.length} volumes and ${chapters.length} chapters.`,
  )
} catch (error) {
  console.error("Error processing manga data:", error)
  process.exit(1)
}
