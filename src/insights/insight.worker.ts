import { eventBus } from "../events/event.bus";

eventBus.subscribe("Insight.New", async (event: any) => {
    console.log("INSIGHT EVENT RECEIVED:", event);
});