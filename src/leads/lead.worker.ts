import { eventBus } from "../events/event.bus";
import { db } from "../db/db";
import { quote_analytics } from "../db/schema";
eventBus.subscribe("Lead.Created", async (event: any) => {
  console.log("WORKER RECEIVED EVENT: ")
  console.log("Lead id: ", event.data.id)
  console.log("Email: ", event.data.email)
  console.log("Workspace ID: ", event.data.workspaceId)
  console.log("DB:", process.env.DATABASE_URL);
});

eventBus.subscribe("Quote.Sent", async (data: {
  workspaceId: string;
  leadId: number;
}) => {
  try {
    console.log("📊 WORKER RECEIVED: Quote.Sent");
    console.log("Lead ID:", data.leadId);
    console.log("Workspace:", data.workspaceId);
    console.log("DB:", process.env.DATABASE_URL);

    // 👉 Insert vào bảng analytics
    const [result] = await db
      .insert(quote_analytics)
      .values({
        workspaceId: data.workspaceId,
        leadId: data.leadId,
        eventType: "Quote.Sent",
      })
      .returning();

    console.log("ANALYTICS SAVED:", result);

  } catch (error) {
    console.error("WORKER ERROR:", error);
    console.log("RETRY or send to DLQ...");
  }
});
