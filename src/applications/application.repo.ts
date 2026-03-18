import { applications } from "../db/schema";
 export const applicationRepo = {
    async createApp(tx: any, data: { leadId: string; position: string; workspaceId: string }) {
        const [application] = await tx.insert(applications).values(data).returning();
        return application;
    },

    async getApp(tx: any){
        return tx.select().from(applications);
    }
 }