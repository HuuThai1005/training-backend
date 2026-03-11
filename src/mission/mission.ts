import { api } from "encore.dev/api";

interface PingResponse {
  message: string;
}

export const ping = api(
  { method: "GET", path: "/ping" },
  async (): Promise<PingResponse> => {
    return {
      message: "Hello from The Farm",
    };
  }
);