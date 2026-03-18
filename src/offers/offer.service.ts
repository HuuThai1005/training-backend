import { sql } from "drizzle-orm";
import { db } from "../db/db";
import { offerRepo } from "./offer.repo";

export const offerService = {
    async createOffer(applicationId: string, salary: number, workspaceId: string) {
        return db.transaction(async (tx) => {
            await tx.execute(
                sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
            );
            if (!applicationId || !salary) {
                throw new Error("EMPTY");
            }
            if (salary <= 0) {
                throw new Error("INVALID_SALARY");
            }
            return offerRepo.createOffer(tx, { applicationId, salary, workspaceId });
        })
    },

    async getOffers(workspaceId: string) {
        return db.transaction(async (tx) => {
            await tx.execute(
                sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
            );
            return offerRepo.getOffers(tx);
        })
}
}