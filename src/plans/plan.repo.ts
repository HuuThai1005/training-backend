import { db } from "../db/db";
import { plans } from "../db/schema";
import { eq } from "drizzle-orm";

export const planRepo = {
  async createPlan(data: { name: string; workspaceId: string }) {
    const [plan] = await db.insert(plans).values(data).returning();
    console.log("Created plan:", plan);
    return plan;

  },

  async getPlans() {
    return db.select().from(plans);
  },

  async updatePlan(id: number, newName: string) {
    const [plan] = await db
      .update(plans)
      .set({ name: newName })
      .where(eq(plans.id, id))
      .returning();

    return plan;
  },

  async deletePlan(id: number) {
    await db.delete(plans).where(eq(plans.id, id));
  },

    async getPlanById(id: number, workspaceId?: string) {
        const plan = db.select().from(plans).where(eq(plans.id, id));
        return plan;
    }


};