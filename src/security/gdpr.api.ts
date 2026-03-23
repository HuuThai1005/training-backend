import { api } from "encore.dev/api";
import { securityService } from "./security.service";

export const exportUserData = api(
  { method: "POST", path: "/gdpr/export" },
  async ({ email, workspaceId }: { email: string; workspaceId: string }) => {
    const data = await securityService.exportUserData(email, workspaceId);
    return data;
  },
);
