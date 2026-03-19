import { api } from "encore.dev/api";
import { eventBus } from "../events/event.bus";

export const sendEvent = api(
  { method: "POST", path: "/dev/sendEvent" },
  async () => {
    await eventBus.publish({
      type: "Quote.Sent",
      data: {
        workspaceId: "22222222-2222-2222-2222-222222222222",
        leadId: 8,
      },
    });

    return { message: "Event sent" };
  },
);
