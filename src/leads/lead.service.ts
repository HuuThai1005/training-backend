import { db } from "../db/db";
import { sql } from "drizzle-orm";
import { leadRepo } from "./lead.repo";

export const leadService = {
  async createLead(name: string, email: string, workspaceId: string) {
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

      return leadRepo.createLead(tx, { name, email, workspaceId });
    });
  },

  async getLeads(workspaceId: string) {
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      return leadRepo.getLead(tx);
    });
  },
};
