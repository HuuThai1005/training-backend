import { pgTable, serial, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  workspaceId: uuid("workspace_id").notNull(),
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  planId: integer("plan_id").references(() => plans.id),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull(),

  workspaceId: uuid("workspace_id").notNull()
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),

  leadId: integer("lead_id").notNull(),

  position: text("position").notNull(),

  workspaceId: uuid("workspace_id").notNull()
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),

  applicationId: integer("application_id").notNull(),

  salary: integer("salary").notNull(),

  workspaceId: uuid("workspace_id").notNull()
});

export const quote_analytics = pgTable("quote_analytics", {
  id: serial("id").primaryKey(),
  workspaceId: uuid("workspace_id").notNull(),
  leadId : integer("lead_id").notNull(),
  eventType: text("event_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  workspaceId: uuid("workspace_id").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: integer("entity_id"),
  createdAt: timestamp("created_at").defaultNow(),
});