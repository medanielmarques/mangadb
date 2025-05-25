import * as cheerio from "cheerio"
import fs from "fs"

const html = fs.readFileSync("src/one-piece-volumes.html", "utf8")
const $ = cheerio.load(html)

const volumes = []
const chapters = []

// Process each volume table
$('table[id^="Volume_"]').each((_, volumeTable) => {
  const $table = $(volumeTable)

  const volumeNumber = parseInt($table.attr("id")?.replace("Volume_", "") ?? "")

  // Get volume data
  const japanRow = $table.find("tr").eq(2)
  const usRow = $table.find("tr").eq(3)

  // Get cover art URL
  const coverArtUrl = $table.find("img").first().attr("src")
  const cleanCoverUrl = coverArtUrl
    ? coverArtUrl
        .replace("/scale-to-width-down/170", "")
        .replace("/revision/latest", "/revision/latest")
    : ""

  // Extract chapters
  const chaptersList = $table.find("ul").first()
  const firstChapter = parseInt(
    chaptersList.find("li").first().text().split(".")[0] ?? "",
  )
  const lastChapter = parseInt(
    chaptersList.find("li").last().text().split(".")[0] ?? "",
  )

  // Create volume object
  const volume = {
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
    coverArtUrl: cleanCoverUrl,
  }

  volumes.push(volume)

  // Process chapters in this volume
  chaptersList.find("li").each((_, chapterItem) => {
    const $chapter = $(chapterItem)
    const chapterText = $chapter.text()

    // Extract chapter number
    const chapterNumber = parseInt(chapterText.split(".")[0] ?? "")

    // Extract English and Japanese titles
    const titleMatch = chapterText.match(/(\d+)\.\s+(.*?)\s+\((.*?)\)/)
    if (titleMatch) {
      const chapter = {
        chapterTitleEnglish: titleMatch[2]?.trim() ?? "",
        chapterTitleJapanese: titleMatch[3]?.trim() ?? "",
        chapterNumber,
        volumeNumber,
      }
      chapters.push(chapter)
    }
  })
})

/**
 * Helper function to format dates to ISO format
 * @param {string} dateStr
 * @returns {string}
 * @example
 * formatDate("2025-01-01") // "2025-01-01"
 * formatDate("2025-01-01[1]") // "2025-01-01"
 */
function formatDate(dateStr) {
  if (!dateStr) return ""
  const date = new Date(dateStr.split("[")[0]?.trim() ?? "")
  if (isNaN(date.getTime())) return ""
  return date.toISOString().split("T")[0] ?? ""
}

// Sort volumes and chapters by their numbers
volumes.sort((a, b) => a.volumeNumber - b.volumeNumber)
chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)

// Write the JSON files
fs.writeFileSync(
  "src/cheerio-one-piece-volumes.json",
  JSON.stringify(volumes, null, 2),
)

// fs.writeFileSync(
//   "src/cheerio-one-piece-chapters-short.json",
//   JSON.stringify(chapters, null, 2),
// )

console.log(
  `Processed ${volumes.length} volumes and ${chapters.length} chapters.`,
)
