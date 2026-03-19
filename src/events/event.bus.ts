type Event = {
  type: string;
  data: any;
};

const listeners: Record<string, Function[]> = {};

export const eventBus = {

  async publish(event: Event) {
    console.log("EVENT EMITTED:", event);

    const handlers = listeners[event.type] || [];

    for (const handler of handlers) {
      await handler(event.data);
    }
  },

  subscribe(type: string, handler: Function) {
    if (!listeners[type]) {
      listeners[type] = [];
    }

    listeners[type].push(handler);
  }

};