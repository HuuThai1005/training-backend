import { api } from "encore.dev/api";
import { planService } from "./plan.service";
import { db } from "../db/db";
export const createPlan = api(
  { method: "POST", path: "/plans" },
  async ({ name, workspaceId }: { name: string; workspaceId: string }) => {
    try {
      const plan = await planService.createPlan(name, workspaceId, ["plans:create"]);
      return { message: "Created successfully", plan };
    } catch (error: any) {
      if (error.message === "EMPTY_NAME") {
        return { message: "Plan name cannot be empty" };
      }
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to create plans" };
      }
    }
  }
);

export const listPlans = api(
  { method: "GET", path: "/plans" },
  async ({ workspaceId }: { workspaceId: string}) => {  
    try {
      return planService.getPlans(workspaceId, ["plans:read"]);
    } catch (error: any) {
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to read plans" };
      }
    }
  }
);

export const updatePlan = api(
  { method: "PUT", path: "/plans/:id" },
  async ({ id, newName, workspaceId }: { id: number; newName: string; workspaceId: string }) => {
    try {
      const plan = await planService.updatePlan(id, newName, workspaceId, ["plans:update"]);
      return { message: "Updated successfully", plan };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
      if (error.message === "EMPTY_NEW_NAME") {
        return { message: "Name cannot be empty" };
      }
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to update plans" };
      }
    }
  }
);

export const deletePlan = api(
  { method: "DELETE", path: "/plans/:id" },
  async ({ id, workspaceId }: { id: number; workspaceId: string }) => {
    try {
      const plan = await planService.deletePlan(id, workspaceId, ["plans:delete"]);
      return { message: "Deleted successfully", plan };
    } catch (error: any) {
      if (error.message === "INVALID_ID") {
        return { message: "Plan ID must be a positive integer" };
      }
      if (error.message === "PLAN_NOT_FOUND") {
        return { message: "Plan not found" };
      }
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to delete plans" };
      }
    }
  }
);