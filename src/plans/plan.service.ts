import { db } from "../db/db";
import { plans } from "../db/schema";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { requireScope } from "../auth/require.scope";
import { planRepo } from "./plan.repo";

export const planService = {
  async getPlans(workspaceId: string, scopes: string[]) {
    requireScope(scopes, "plans:read");

    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      return planRepo.getPlans();
    });
  },

  async createPlan(name: string, workspaceId: string, scopes: string[]) {
    requireScope(scopes, "plans:create");

    if (!name) {
      throw new Error("EMPTY_NAME");
    }

    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );


      return planRepo.createPlan({ name, workspaceId });
    });
  },

  async updatePlan(
    id: number,
    newName: string,
    workspaceId: string,
    scopes: string[],
  ) {
    requireScope(scopes, "plans:update");

    if (!newName) {
      throw new Error("EMPTY_NEW_NAME");
    }

    if (typeof id !== "number" || id <= 0) {
      throw new Error("INVALID_ID");
    }

    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      const [existing] = await tx.select().from(plans).where(eq(plans.id, id));

      if (!existing) {
        throw new Error("PLAN_NOT_FOUND");
      }


      return planRepo.updatePlan(id, newName);
    });
  },

  async deletePlan(id: number, workspaceId: string, scopes: string[]) {
    requireScope(scopes, "plans:delete");

    if (typeof id !== "number" || id <= 0) {
      throw new Error("INVALID_ID");
    }

    return db.transaction(async (tx) => {
      await tx.execute(
        sql.raw(`SET LOCAL app.workspace_id = '${workspaceId}'`),
      );

      const [existing] = await tx.select().from(plans).where(eq(plans.id, id));

      if (!existing) {
        throw new Error("PLAN_NOT_FOUND");
      }

      return planRepo.deletePlan(id);
    });
  },
};
