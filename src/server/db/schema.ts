// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { customAlphabet } from "nanoid"

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const nanoid = (defaultLength = 20) => customAlphabet(alphabet, defaultLength)

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const users = pgTable("users", {
  id: text("id").notNull().unique(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})
