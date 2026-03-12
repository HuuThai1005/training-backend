import { api } from "encore.dev/api";
import { adminService } from "./admin.service";

export const checkin = api(
  { method: "GET", path: "/admin/checkin" },
  async ({ userId, roles }: { userId: string; roles: string[] }) => {

    try {

      return await adminService.checkin(userId, roles);

    } catch (error: any) {

      if (error.message === "FORBIDDEN") {

        console.log("[AUDIT] ACCESS DENIED");

        return {
          message: "Admin access denied"
        };

      }

    }

  }
);