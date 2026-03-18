import { offers } from "../db/schema";

export const offerRepo = {
    async createOffer(tx: any, data: { applicationId: string; salary: number; workspaceId: string }) {
        const [offer] = await tx.insert(offers).values(data).returning();
        return offer;
    },

    async getOffers(tx: any){
        return tx.select().from(offers);
    }
}