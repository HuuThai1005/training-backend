import { db } from "../db/db";
import { sql } from "drizzle-orm"; 
import { applicationRepo } from "./application.repo";
import { requireScope } from "../auth/require.scope";

export const applicationService = {
    async createApp(leadId: string, position: string, workspaceId: string, scopes: string[]) {
        requireScope(scopes, "applications:create");
        return db.transaction(async (tx) => {
            await tx.execute(
                sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
            );
            if (!leadId || !position) {
                throw new Error("EMPTY");
            }
            return applicationRepo.createApp(tx, { leadId, position, workspaceId });
        })
    },

    async getApps(workspaceId: string, scopes: string[]) {
        requireScope(scopes, "applications:read");
        return db.transaction(async (tx) => {
            await tx.execute(
                sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
            );
            return applicationRepo.getApp(tx);
        })
    }
}