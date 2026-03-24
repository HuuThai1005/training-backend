import { api } from "encore.dev/api";
import { insightService } from "./insight.service";

export const createInsight = api(
  { method: "POST", path: "/insights" },
  async ({
    content,
    workspaceId,
    scopes,
  }: {
    content: string;
    workspaceId: string;
    scopes: string[];
  }) => {
    try {
      return await insightService.createInsight(content, workspaceId, scopes);
    } catch (error: any) {
      if (error.message === "CONTENT_EMPTY") {
        return {
          message: "Content cannot be empty",
        };
      }
      if (error.message === "WORKSPACEID_EMPTY") {
        return {
          message: "Workspace ID cannot be empty",
        };
      }
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to create insights" };
      }

    }
  }
);

export const getInsights = api(
  { method: "GET", path: "/insights" },
  async ({
    workspaceId,
    scopes,
  }: {
    workspaceId: string;
    scopes: string[];
  }) => { 
    try {
      return await insightService.getInsights(workspaceId, scopes);
    } catch (error: any) {
      if (error.message === "WORKSPACEID_EMPTY") {
        return {
          message: "Workspace ID cannot be empty",
        };
      }
      if (error.message === "FORBIDDEN") {
        return { message: "You do not have permission to read insights" };
      }
    }

  }
);