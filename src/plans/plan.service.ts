import {planRepo} from "./plan.repo";

export const planService = {
    async createPlan(name: string) {
        if (!name) {
            throw new Error("EMPTY_NAME");
        }
        return await planRepo.createPlan(name);
    },

    async getPlans() {
        return await planRepo.getPlans();
    },

    async updatePlan(id: number, newName: string) {
        if (!newName) {
            throw new Error("EMPTY_NEW_NAME");
        }
        if (typeof id !== "number" || id <= 0) {
            throw new Error("INVALID_ID");
        }
        const existing = await planRepo.getPlanById(id);
        if (!existing) {
            throw new Error("PLAN_NOT_FOUND");
        }
        return await planRepo.updatePlan(id, newName);
    },

    async deletePlan(id: number) {
        if (typeof id !== "number" || id <= 0) {
            throw new Error("INVALID_ID");
        }
        const existing = await planRepo.getPlanById(id);
        if (!existing) {
            throw new Error("PLAN_NOT_FOUND");
        }
        await planRepo.deletePlan(id);
    }
}
