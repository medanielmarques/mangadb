ALTER TABLE "images" RENAME COLUMN "image_type" TO "type";--> statement-breakpoint
ALTER TABLE "images" DROP CONSTRAINT "images_manga_id_mangas_id_fk";
--> statement-breakpoint
ALTER TABLE "images" DROP CONSTRAINT "images_volume_id_volumes_id_fk";
--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "entity_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "manga_id";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "volume_id";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "size";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "mime_type";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "width";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "height";