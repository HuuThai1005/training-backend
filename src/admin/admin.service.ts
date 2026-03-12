import { requireRole } from "../auth/require.role";

export const adminService = {

  async checkin(userId: string, roles: string[]) {

    console.log("[AUDIT] Admin checkin attempt");
    console.log("[AUDIT] user:", userId);
    console.log("[AUDIT] roles:", roles);
    console.log("[AUDIT] time: ", new Date().toLocaleDateString(), new Date().toLocaleTimeString());

    requireRole(roles, "admin");

    console.log("[AUDIT] ACCESS GRANTED");

    return {
      message: "Admin checkin successful",
      userId
    };

  }

};