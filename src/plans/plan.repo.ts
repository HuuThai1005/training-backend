import { db } from "../db/db";
import { plans } from "../db/schema";
import { eq } from "drizzle-orm";

export const planRepo = {
    async createPlan(name: string) {
        const [plan] = await db.insert(plans).values({ name}).returning();
        return plan;
    },

    async getPlans() {
        const plan = await db.select().from(plans);
        return plan;
    },

    async updatePlan(id: number, newName: string) {
        const [plan] = await db.update(plans).set({ name: newName }).where(eq(plans.id, id)).returning();
        return plan;
    },

    async deletePlan(id: number) {
        await db.delete(plans).where(eq(plans.id, id));
    },

    async getPlanById(id: number) {
        const [plan] = await db.select().from(plans).where(eq(plans.id, id));
        return plan;
    }
}