import { api } from "encore.dev/api";
import { eventBus } from "../events/event.bus";

export const sendEvent = api(
  { method: "POST", path: "/dev/sendEvent" },
  async () => {
    await eventBus.publish({
      type: "Quote.Sent",
      data: {
        workspaceId: "11111111-1111-1111-1111-111111111111",
        leadId: 999,
      },
    });

    return { message: "Event sent" };
  },
);
