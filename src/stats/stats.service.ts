import { db } from "../db/db";
import { sql } from "drizzle-orm";
import { statsRepo } from "./stats.repo";
import { logger } from "../observability/logger";

export const statsService = {

  async getConversion(workspaceId: string) {
    return db.transaction(async (tx) => {

      await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`
      );

      const leads = await statsRepo.getLeads(tx);
      logger.info("LEADS DATA: ", leads)

      const quotes = await statsRepo.getQuotes(tx);
      logger.info("QUOTES DATA: ", quotes) 

      const totalLeads = leads.length;

      const convertedSet = new Set(
        quotes
          .map((q: any) => q.lead_id)
          .filter((id: number) => leads.some((l: any) => l.id === id))
      );

      const convertedLeads = convertedSet.size;

      return {
        totalLeads,
        convertedLeads,
        conversionRate:
          totalLeads === 0 ? 0 : (convertedLeads / totalLeads) * 100,
      };
    });
  },

  async getQuoteRate(workspaceId: string) {
    return db.transaction(async (tx) => {

      await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`
      );

      const totalQuotes = await statsRepo.countQuotes(tx);

      return {
        totalQuotes,
      };
    });
  }

};