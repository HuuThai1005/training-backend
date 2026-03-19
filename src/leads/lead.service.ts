import { db } from "../db/db";
import { sql } from "drizzle-orm";
import { leadRepo } from "./lead.repo";
import { requireScope } from "../auth/require.scope";
import { eventBus } from "../events/event.bus";
import "./lead.worker";

export const leadService = {
  async createLead(
    name: string,
    email: string,
    workspaceId: string,
    scopes: string[],
  ) {
    requireScope(scopes, "leads:create");
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );
      if (!name || !email) {
        throw new Error("EMPTY");
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("INVALID_FORMAT_EMAIL");
      }

      const lead = await leadRepo.createLead(tx, { name, email, workspaceId });

      await eventBus.publish({
        type: "Lead.Created",
        data: {
          id: lead.id,
          email: lead.email,
          workspaceId: lead.workspaceId,
        },
      });
      

      return lead;
    });
  },

  async getLeads(workspaceId: string, scopes: string[]) {
    requireScope(scopes, "leads:read");
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      return leadRepo.getLead(tx);
    });
  },
};
