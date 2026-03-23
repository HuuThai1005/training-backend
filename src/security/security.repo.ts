import { sql } from "drizzle-orm";

export const securityRepo = {
  async getLeadsByEmail(tx: any, email: string) {
    const result = await tx.execute(sql`
            SELECT * FROM leads WHERE email = ${email}
        `);
    return result.rows;
  },
  async getQuotesByEmail(tx: any, email: string) {
    const result = await tx.execute(sql`
            SELECT * FROM quote_analytics
            WHERE lead_id IN (
                SELECT id FROM leads WHERE email = ${email}
            )
        `);
    return result.rows;
  },
};
