import { pgTable, serial, text, uuid, integer } from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  planId: integer("plan_id").references(() => plans.id),
});