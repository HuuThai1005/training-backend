import { api } from "encore.dev/api";
import { db } from "../db/db";
import { sql } from "drizzle-orm";

export const getQuoteRate = api(
  { method: "GET", path: "/stats/quote-rate" },
  async ({ workspaceId }: { workspaceId: string }) => {
    console.log("DB API:", process.env.DATABASE_URL);
    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      const result = await tx.execute(sql`
    SELECT COUNT(*) as total_quotes
    FROM quote_analytics
    WHERE workspace_id = ${workspaceId}
  `);

      return {
        totalQuotes: Number(result.rows[0].total_quotes),
      };
    });
  },
);

export const getConversion = api(
  { method: "GET", path: "/conversion" },
  async ({ workspaceId }: { workspaceId: string }) => {
    return await db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT set_config('app.workspace_id', ${workspaceId}, true)`,
      );

      const result = await tx.execute(sql`
  SELECT 
    (SELECT COUNT(*) FROM leads) as total_leads,

    (
      SELECT COUNT(DISTINCT q.lead_id)
      FROM quote_analytics q
      JOIN leads l ON l.id = q.lead_id
    ) as converted_leads
`);

      const leads = await tx.execute(sql`SELECT * FROM leads`);
      console.log("LEADS:", leads.rows);

      const quotes = await tx.execute(sql`SELECT * FROM quote_analytics`);
      console.log("QUOTES:", quotes.rows);

      const totalLeads = Number(result.rows[0].total_leads);
      const convertedLeads = Number(result.rows[0].converted_leads);

      return {
        totalLeads,
        convertedLeads,
        conversionRate:
          totalLeads === 0 ? 0 : (convertedLeads / totalLeads) * 100,
      };
    });
  },
);
