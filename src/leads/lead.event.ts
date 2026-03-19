export type LeadCreateEvent = {
    type: "Lead.Created";
    data: {
        id: string,
        email: string,
        workspaceId: string
    };
};