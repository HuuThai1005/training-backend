import { securityRepo } from "./security.repo";
import { logger } from "../observability/logger";
import { db } from "../db/db";
import { sql } from "drizzle-orm";

export const securityService = {
  async exportUserData(email: string, workspaceId: string) {
    return db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`,
      );
      const leads = await securityRepo.getLeadsByEmail(tx, email);
      const quotes = await securityRepo.getQuotesByEmail(tx, email);

      logger.info("GDPR EXPORT: ", {
        email,
        leadsCount: leads.length,
        quotesCount: quotes.length,
      });
      return {
        leads,
        quotes,
      };
    });
  },
};
