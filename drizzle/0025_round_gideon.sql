ALTER TABLE "chapters" DROP CONSTRAINT "chapters_id_unique";--> statement-breakpoint
ALTER TABLE "images" DROP CONSTRAINT "images_id_unique";--> statement-breakpoint
ALTER TABLE "manga_favorites" DROP CONSTRAINT "manga_favorites_id_unique";--> statement-breakpoint
ALTER TABLE "mangas" DROP CONSTRAINT "mangas_id_unique";--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_id_unique";--> statement-breakpoint
ALTER TABLE "story_arcs" DROP CONSTRAINT "story_arcs_id_unique";--> statement-breakpoint
ALTER TABLE "volumes" DROP CONSTRAINT "volumes_id_unique";--> statement-breakpoint
ALTER TABLE "chapters" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "images" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "manga_favorites" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "mangas" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "reviews" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "story_arcs" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "volumes" ADD PRIMARY KEY ("id");