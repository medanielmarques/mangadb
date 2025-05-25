ALTER TABLE "volumes" RENAME COLUMN "published_at" TO "published_at_japan";--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "published_at_us" timestamp;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "isbn_japan" text;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "isbn_us" text;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "pages_in_japan" integer;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "pages_in_us" integer;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "first_chapter" integer;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "last_chapter" integer;--> statement-breakpoint
ALTER TABLE "volumes" ADD COLUMN "cover_art_url" text;