import { insightRepo } from "./insight.repo";
import { db } from "../db/db";
import { sql } from "drizzle-orm";
import { requireScope } from "../auth/require.scope";
import { eventBus } from "../events/event.bus";
import "./insight.worker";

export const insightService = {
  async createInsight(content: string, workspaceId: string, scopes: string[]) {
    requireScope(scopes, "insights:create");
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );
      if (!content || content.trim() === "") {
        throw new Error("CONTENT_EMPTY");
      }
      if (!workspaceId || workspaceId.trim() === "") {
        throw new Error("WORKSPACEID_EMPTY");
      }

      const insight = await insightRepo.createInsight(tx, {
        content,
        workspaceId,
      });
      const log = await insightRepo.createAuditLog(tx, {
        workspaceId,
        action: "CREATE_INSIGHT",
        entity: "insight",
        entityId: insight.id,
      });
      console.log("Audit log created:", log);
      await eventBus.publish({
        type: "Insight.New",
        data: {
          id: insight.id,
          workspaceId,
        },
      });
      console.log("Transaction done");;
      return insight;
    });
    
  },
  async getInsights(workspaceId: string, scopes: string[]) {
    requireScope(scopes, "insights:read");
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );
      if (!workspaceId || workspaceId.trim() === "") {
        throw new Error("WORKSPACEID_EMPTY");
      }

      const insight = await insightRepo.getInsights(tx);
      const log =await insightRepo.createAuditLog(tx, {
        workspaceId,
        action: "READ_INSIGHTS",
        entity: "insight",
        entityId: 0,
      });
      console.log("Audit log created:", log);
      console.log("Transaction done");
      return insight;
    });
  },
};
