import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core"
import { customAlphabet } from "nanoid"

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const nanoid = (defaultLength = 20) => customAlphabet(alphabet, defaultLength)

export const manga_status = pgEnum("status", [
  "ongoing",
  "completed",
  "on_hiatus",
  "cancelled",
])

export const manga_translation_status = pgEnum("translation_status", [
  "in_progress",
  "completed",
  "on_hold",
  "cancelled",
])

export const manga_demographic = pgEnum("demographic", [
  "shonen",
  "shoujo",
  "josei",
  "seinen",
  "kodomo",
])

export const image_type = pgEnum("image_type", ["volume_cover", "manga_cover"])

export const users = pgTable("users", {
  id: text("id").notNull().unique(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const mangas = pgTable("mangas", {
  id: text("id").notNull().unique().$default(nanoid(12)),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authors: varchar("authors").array().notNull(),
  artists: varchar("artists").array(),
  status: manga_status("status").notNull(),
  translation_status: manga_translation_status("translation_status"),
  demographic: manga_demographic("demographic").notNull(),
  genres: varchar("genres").array().notNull(),
  themes: varchar("themes").array().notNull(),
  format: varchar("format").array(),
  publishers: varchar("publishers").array().notNull(),
  publishedAt: timestamp("published_at").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const volumes = pgTable(
  "volumes",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    number: integer("number").notNull(),
    mangaId: text("manga_id")
      .notNull()
      .references(() => mangas.id),
    title: text("title").notNull(),
    publishedAt: timestamp("published_at").notNull(),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [unique("manga_id_number_unique").on(table.mangaId, table.number)],
)

export const storyArcs = pgTable("story_arcs", {
  id: text("id").notNull().unique().$default(nanoid()),
  mangaId: text("manga_id")
    .notNull()
    .references(() => mangas.id),
  title: text("title").notNull(),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const chapters = pgTable(
  "chapters",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    number: integer("number").notNull(),
    volumeId: text("volume_id").notNull(),
    storyArcId: text("story_arc_id").notNull(),
    title: text("title").notNull(),
    publishedAt: timestamp("published_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique("volume_id_story_arc_id_number_unique").on(
      table.volumeId,
      table.storyArcId,
      table.number,
    ),
  ],
)

export const reviews = pgTable(
  "reviews",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    mangaId: text("manga_id").references(() => mangas.id),
    storyArcId: text("story_arc_id").references(() => storyArcs.id),
    chapterId: text("chapter_id").references(() => chapters.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    spoiler: boolean("spoiler").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique("user_id_manga_id_unique").on(table.userId, table.mangaId),
    unique("user_id_story_arc_id_unique").on(table.userId, table.storyArcId),
    unique("user_id_chapter_id_unique").on(table.userId, table.chapterId),
  ],
)

export const images = pgTable("images", {
  id: text("id").notNull().unique().$default(nanoid()),
  url: text("url").notNull(),
  type: image_type("image_type").notNull(),
  mangaId: text("manga_id").references(() => mangas.id),
  volumeId: text("volume_id").references(() => volumes.id),
  filename: text("filename").notNull(),
  size: integer("size").notNull(),
  mimeType: text("mime_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})
