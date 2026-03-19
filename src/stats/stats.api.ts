import { api } from "encore.dev/api";
import { db } from "../db/db";
import { sql } from "drizzle-orm";

export const getQuoteRate = api(
  { method: "GET", path: "/stats/quote-rate" },
  async ({ workspaceId }: { workspaceId: string }) => {
    console.log("DB API:", process.env.DATABASE_URL);
return db.transaction(async (tx) => {
  await tx.execute(
    sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`)
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
  }
);