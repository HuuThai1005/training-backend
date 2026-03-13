import { api } from "encore.dev/api";
import { leadService } from "./lead.service";

export const createLead = api(
  { method: "POST", path: "/leads" },
  async ({
    name,
    email,
    workspaceId,
  }: {
    name: string;
    email: string;
    workspaceId: string;
  }) => {
    try {
const lead = await leadService.createLead(name, email, workspaceId);

    return {
      message: "Created successfully",
      data: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        workspaceId: lead.workspaceId,
      },
    };
    }
      catch (error: any) {
      if (error.message === "EMPTY") {
        return {
          message: "Name and email are required",
        };
      }
      if (error.message === "INVALID_FORMAT_EMAIL") {
        return {
          message: "Invalid email format",
        };
      };
    }
  },
);

export const listLeads = api(
  { method: "GET", path: "/leads" },
  async ({ workspaceId }: { workspaceId: string }) => {
    return leadService.getLeads(workspaceId);
  },
);
