import { api } from "encore.dev/api";

export const ping = api(
  { method: "GET", path: "/ping" },
  async () => {
    return {
      message: "hello from The Farm",
    };
  }
);