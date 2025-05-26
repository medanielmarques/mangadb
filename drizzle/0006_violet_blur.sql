ALTER TABLE "chapters" RENAME COLUMN "volume_id" TO "volume_number";--> statement-breakpoint
ALTER TABLE "chapters" DROP CONSTRAINT "volume_id_story_arc_id_number_unique";--> statement-breakpoint
ALTER TABLE "chapters" ALTER COLUMN "story_arc_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chapters" ALTER COLUMN "published_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chapters" ADD COLUMN "manga_id" text;--> statement-breakpoint
ALTER TABLE "chapters" ADD COLUMN "chapter_length" integer;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;