CREATE TYPE "public"."image_type" AS ENUM('volume_cover', 'manga_cover');--> statement-breakpoint
CREATE TABLE "images" (
	"id" text NOT NULL,
	"url" text NOT NULL,
	"image_type" "image_type" NOT NULL,
	"manga_id" text,
	"volume_id" text,
	"filename" text NOT NULL,
	"size" integer NOT NULL,
	"mime_type" text NOT NULL,
	"width" integer,
	"height" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "images_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_volume_id_volumes_id_fk" FOREIGN KEY ("volume_id") REFERENCES "public"."volumes"("id") ON DELETE no action ON UPDATE no action;