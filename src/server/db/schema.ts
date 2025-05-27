import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  jsonb,
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
  "hiatus",
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

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(manga_favorites),
}))

export const mangas = pgTable("mangas", {
  id: text("id").notNull().unique().$default(nanoid(12)),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authors: varchar("authors").array().notNull(),
  artists: varchar("artists").array(),
  status: manga_status("status").notNull(),
  translation_status: manga_translation_status("translation_status"),
  demographic: manga_demographic("demographic").notNull(),
  genres: varchar("genres").array(),
  themes: varchar("themes").array(),
  format: varchar("format").array(),
  publishers: varchar("publishers").array(),
  publishedAt: timestamp("published_at").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const mangasRelations = relations(mangas, ({ many }) => ({
  volumes: many(volumes),
  favorites: many(manga_favorites),
  reviews: many(reviews),
  chapters: many(chapters),
}))

export const volumes = pgTable(
  "volumes",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    number: integer("number").notNull(),
    mangaId: text("manga_id")
      .notNull()
      .references(() => mangas.id),
    title: text("title").notNull(),
    publishedAtJapan: timestamp("published_at_japan"),
    publishedAtUs: timestamp("published_at_us"),
    isbnJapan: text("isbn_japan"),
    isbnUs: text("isbn_us"),
    pagesInJapan: integer("pages_in_japan"),
    pagesInUs: integer("pages_in_us"),
    firstChapter: integer("first_chapter"),
    lastChapter: integer("last_chapter"),
    completedAt: timestamp("completed_at"),
    isComplete: boolean("is_complete").notNull().default(false),
    isLatestCompleteVolume: boolean("is_latest_complete_volume")
      .notNull()
      .default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return [
      unique("manga_id_number_unique").on(table.mangaId, table.number),
      index("volumes_manga_id_is_latest_complete_volume_idx").on(
        table.mangaId,
        table.isLatestCompleteVolume,
      ),
    ]
  },
)

export const volumesRelations = relations(volumes, ({ one }) => ({
  manga: one(mangas, {
    fields: [volumes.mangaId],
    references: [mangas.id],
  }),
}))

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

export const storyArcsRelations = relations(storyArcs, ({ one, many }) => ({
  manga: one(mangas, {
    fields: [storyArcs.mangaId],
    references: [mangas.id],
  }),
  chapters: many(chapters),
  reviews: many(reviews),
}))

export const chapters = pgTable("chapters", {
  id: text("id").notNull().unique().$default(nanoid()),
  number: integer("number").notNull(),
  mangaId: text("manga_id")
    .notNull()
    .references(() => mangas.id),
  volumeNumber: integer("volume_number").notNull(),
  storyArcId: text("story_arc_id"),
  title: text("title").notNull(),
  chapterLength: integer("chapter_length"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  manga: one(mangas, {
    fields: [chapters.mangaId],
    references: [mangas.id],
  }),
  reviews: many(reviews),
  volume: one(volumes, {
    fields: [chapters.volumeNumber],
    references: [volumes.number],
  }),
}))

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

export const reviewsRelations = relations(reviews, ({ one }) => ({
  manga: one(mangas, {
    fields: [reviews.mangaId],
    references: [mangas.id],
  }),
  storyArc: one(storyArcs, {
    fields: [reviews.storyArcId],
    references: [storyArcs.id],
  }),
  chapter: one(chapters, {
    fields: [reviews.chapterId],
    references: [chapters.id],
  }),
}))

export const images = pgTable(
  "images",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    url: text("url").notNull(),
    type: image_type("type").notNull(),
    entityId: text("entity_id").notNull(),
    filename: text("filename").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [unique("entity_id_type_unique").on(table.entityId, table.type)],
)

export const manga_favorites = pgTable(
  "manga_favorites",
  {
    id: text("id").notNull().unique().$default(nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    mangaId: text("manga_id")
      .notNull()
      .references(() => mangas.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    unique("manga_favorites_user_id_manga_id_unique").on(
      table.userId,
      table.mangaId,
    ),
  ],
)

export const mangaFavoritesRelations = relations(
  manga_favorites,
  ({ one }) => ({
    user: one(users, {
      fields: [manga_favorites.userId],
      references: [users.id],
    }),
    manga: one(mangas, {
      fields: [manga_favorites.mangaId],
      references: [mangas.id],
    }),
  }),
)
