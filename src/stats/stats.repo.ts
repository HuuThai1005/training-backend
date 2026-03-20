import { sql } from "drizzle-orm";

export const statsRepo = {

  async getLeads(tx: any) {
    const res = await tx.execute(sql`SELECT * FROM leads`);
    return res.rows;
  },

  async getQuotes(tx: any) {
    const res = await tx.execute(sql`SELECT * FROM quote_analytics`);
    return res.rows;
  },

  async countQuotes(tx: any) {
    const res = await tx.execute(sql`
      SELECT COUNT(*) as total FROM quote_analytics
    `);
    return Number(res.rows[0].total);
  }

};