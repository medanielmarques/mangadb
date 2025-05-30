CREATE TABLE "manga_favorites" (
	"id" text NOT NULL,
	"user_id" text NOT NULL,
	"manga_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "manga_favorites_id_unique" UNIQUE("id"),
	CONSTRAINT "manga_favorites_user_id_manga_id_unique" UNIQUE("user_id","manga_id")
);
--> statement-breakpoint
ALTER TABLE "manga_favorites" ADD CONSTRAINT "manga_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manga_favorites" ADD CONSTRAINT "manga_favorites_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE no action ON UPDATE no action;