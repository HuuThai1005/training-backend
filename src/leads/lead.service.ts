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

    const lead = await db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`,
      );

      const lead = await leadRepo.createLead(tx, { name, email, workspaceId });

      return lead;
    });

    await eventBus.publish({
      type: "Lead.Created",
      data: {
        id: lead.id,
        email: lead.email,
        workspaceId: lead.workspaceId,
      },
    });

    return lead;
  },

  async getLeads(workspaceId: string, scopes: string[]) {
    requireScope(scopes, "leads:read");

    return db.transaction(async (tx) => {
      const check = await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`,
      );

      const leads = await leadRepo.getLead(tx);

      return leads;
    });
  },
};
