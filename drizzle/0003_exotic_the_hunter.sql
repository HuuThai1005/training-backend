CREATE TABLE "quote_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" uuid NOT NULL,
	"lead_id" integer NOT NULL,
	"event_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
