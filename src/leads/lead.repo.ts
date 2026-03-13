import { leads } from "../db/schema";

export const leadRepo = {
  async createLead(tx: any, data: { name: string; email: string; workspaceId: string }) {
    const [lead] = await tx.insert(leads).values(data).returning();
    return lead;
  },

  async getLead(tx:any) {
    return tx.select().from(leads);
  },
};
