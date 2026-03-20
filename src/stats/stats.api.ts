import { api } from "encore.dev/api";
import { statsService } from "./stats.service";

export const getConversion = api(
  { method: "GET", path: "/conversion" },
  async ({ workspaceId }: { workspaceId: string }) => {
    return statsService.getConversion(workspaceId);
  }
);

export const getQuoteRate = api(
  { method: "GET", path: "/stats/quote-rate" },
  async ({ workspaceId }: { workspaceId: string }) => {
    return statsService.getQuoteRate(workspaceId);
  }
);