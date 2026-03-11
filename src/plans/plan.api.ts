import { api } from "encore.dev/api";
import { planService } from "./plan.service";
export const createPlan = api(
  { method: "POST", path: "/plans" },
  async ({ name }: { name: string }) => {
    try {
      await planService.createPlan(name);
      return { message: "Created successfully" };
    } catch (error: any) {
      if (error.message === "EMPTY_NAME") {
        return { message: "Plan name cannot be empty" };
      }
    }
  },
);

export const listPlans = api({ method: "GET", path: "/plans" }, async () => {
  return planService.getPlans();
});

export const updatePlan = api(
  { method: "PUT", path: "/plans/:id" },
  async ({ id, newName }: { id: number; newName: string }) => {
    try {
      await planService.updatePlan(id, newName);
      return { message: "Updated successfully" };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
    }
  },
);

export const deletePlan = api(
  { method: "DELETE", path: "/plans/:id" },
  async ({ id }: { id: number }) => {
    try {
      await planService.deletePlan(id);
      return { message: "Deleted successfully" };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
    }
  },
);
