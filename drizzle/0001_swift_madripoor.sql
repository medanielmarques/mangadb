CREATE TYPE "public"."demographic" AS ENUM('shonen', 'shoujo', 'josei', 'seinen', 'kodomo');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ongoing', 'completed', 'on_hiatus', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."translation_status" AS ENUM('in_progress', 'completed', 'on_hold', 'cancelled');--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" text NOT NULL,
	"number" integer NOT NULL,
	"volume_id" text NOT NULL,
	"story_arc_id" text NOT NULL,
	"title" text NOT NULL,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "chapters_id_unique" UNIQUE("id"),
	CONSTRAINT "volume_id_story_arc_id_number_unique" UNIQUE("volume_id","story_arc_id","number")
);
--> statement-breakpoint
CREATE TABLE "mangas" (
	"id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"authors" varchar[] NOT NULL,
	"artists" varchar[] NOT NULL,
	"status" "status" NOT NULL,
	"translation_status" "translation_status" NOT NULL,
	"demographic" "demographic" NOT NULL,
	"genres" varchar[] NOT NULL,
	"themes" varchar[] NOT NULL,
	"format" varchar[],
	"publishers" varchar[] NOT NULL,
	"published_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "mangas_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text NOT NULL,
	"user_id" text NOT NULL,
	"manga_id" text,
	"story_arc_id" text,
	"chapter_id" text,
	"rating" integer NOT NULL,
	"comment" text,
	"spoiler" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "reviews_id_unique" UNIQUE("id"),
	CONSTRAINT "user_id_manga_id_unique" UNIQUE("user_id","manga_id"),
	CONSTRAINT "user_id_story_arc_id_unique" UNIQUE("user_id","story_arc_id"),
	CONSTRAINT "user_id_chapter_id_unique" UNIQUE("user_id","chapter_id")
);
--> statement-breakpoint
CREATE TABLE "story_arcs" (
	"id" text NOT NULL,
	"manga_id" text NOT NULL,
	"title" text NOT NULL,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "story_arcs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "volumes" (
	"id" text NOT NULL,
	"number" integer NOT NULL,
	"manga_id" text NOT NULL,
	"title" text NOT NULL,
	"published_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "volumes_id_unique" UNIQUE("id"),
	CONSTRAINT "manga_id_number_unique" UNIQUE("manga_id","number")
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_story_arc_id_story_arcs_id_fk" FOREIGN KEY ("story_arc_id") REFERENCES "public"."story_arcs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_arcs" ADD CONSTRAINT "story_arcs_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "volumes" ADD CONSTRAINT "volumes_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;