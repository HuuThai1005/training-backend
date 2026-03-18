import { api } from "encore.dev/api";
import { applicationService } from "./application.service";

export const createApp = api(
    { method: "POST", path: "/applications" },
    async ({
        leadId,
        position,
        workspaceId
    }: {
        leadId: string;
        position: string;
        workspaceId: string;
    }) => {
        try{
            const app = await applicationService.createApp(leadId, position, workspaceId);
            return {
                message: "Created successfully",
                data: {
                    id: app.id,
                    leadId: app.leadId,
                    position: app.position,
                    workspaceId: app.workspaceId
                }
            }
        }
        catch (error: any) {
            if ( error.message === "EMPTY") {
                return {
                    message: "Lead ID and position are required",
                };
            }
        }
    }
);

export const getApps = api(
    { method: "GET", path: "/applications" },
    async ({ workspaceId }: { workspaceId: string }) => {
        try {
            const apps = await applicationService.getApps(workspaceId);
            return {
                apps
            };
        }
        catch (error: any) {
            if ( error.message === "EMPTY") {
                return {
                    message: "Workspace ID is required",
                };
            }
        }
    }
);