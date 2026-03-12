import { api } from "encore.dev/api";
import { planService } from "./plan.service";
import { db } from "../db/db";
const user = await db.execute(`SELECT current_user`);
console.log(user);
export const createPlan = api(
  { method: "POST", path: "/plans" },
  async ({ name, workspaceId }: { name: string; workspaceId: string }) => {
    try {
      await planService.createPlan(name, workspaceId);
      return { message: "Created successfully" };
    } catch (error: any) {
      if (error.message === "EMPTY_NAME") {
        return { message: "Plan name cannot be empty" };
      }
    }
  }
);

export const listPlans = api(
  { method: "GET", path: "/plans" },
  async ({ workspaceId }: { workspaceId: string }) => {
    return planService.getPlans(workspaceId);
  }
);

export const updatePlan = api(
  { method: "PUT", path: "/plans/:id" },
  async ({ id, newName, workspaceId }: { id: number; newName: string; workspaceId: string }) => {
    try {
      await planService.updatePlan(id, newName, workspaceId);
      return { message: "Updated successfully" };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
    }
  }
);

export const deletePlan = api(
  { method: "DELETE", path: "/plans/:id" },
  async ({ id, workspaceId }: { id: number; workspaceId: string }) => {
    try {
      await planService.deletePlan(id, workspaceId);
      return { message: "Deleted successfully" };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
    }
  }
);