import { sql } from "drizzle-orm";

export const insightRepo = {
  async createInsight(tx: any, data: any) {
    const result = await tx.execute(sql`
            INSERT INTO insights (workspace_id, content)
            VALUES (${data.workspaceId}, ${data.content})
            RETURNING *
        `);
    return result.rows[0];
  },
  async getInsights(tx: any) {
    const result = await tx.execute(sql`
            SELECT * FROM insights
        `);
    return result.rows;
  },
  async createAuditLog(tx: any, data: any) {
    const result = await tx.execute(sql`
  INSERT INTO audit_logs (workspace_id, action, entity, entity_id)
  VALUES (
    ${data.workspaceId},
    ${data.action},
    ${data.entity},
    ${data.entityId}
  )
    RETURNING *
`);
    return result.rows[0];
  },
};
