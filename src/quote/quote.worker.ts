import { eventBus } from "../events/event.bus";
import { db } from "../db/db";
import { sql } from "drizzle-orm";

eventBus.subscribe("Quote.Sent", async (data: { leadId: number; workspaceId: string }) => {
  console.log("TRACKING QUOTE:", data);

  await db.execute(sql`SET search_path TO public`);

await db.execute(sql`
  INSERT INTO quote_analytics (workspace_id, lead_id, event_type)
  VALUES (${data.workspaceId}, ${data.leadId}, "Quote.Sent")
`);
});