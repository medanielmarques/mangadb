ALTER TABLE "public"."mangas" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ongoing', 'completed', 'hiatus', 'cancelled');--> statement-breakpoint
ALTER TABLE "public"."mangas" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";