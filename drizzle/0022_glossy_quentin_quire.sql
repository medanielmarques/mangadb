ALTER TABLE "chapters" DROP CONSTRAINT "chapters_manga_id_mangas_id_fk";
--> statement-breakpoint
ALTER TABLE "manga_favorites" DROP CONSTRAINT "manga_favorites_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "manga_favorites" DROP CONSTRAINT "manga_favorites_manga_id_mangas_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_manga_id_mangas_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_story_arc_id_story_arcs_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_chapter_id_chapters_id_fk";
--> statement-breakpoint
ALTER TABLE "story_arcs" DROP CONSTRAINT "story_arcs_manga_id_mangas_id_fk";
--> statement-breakpoint
ALTER TABLE "volumes" DROP CONSTRAINT "volumes_manga_id_mangas_id_fk";
