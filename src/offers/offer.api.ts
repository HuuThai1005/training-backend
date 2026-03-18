import { offerService } from "./offer.service";
import { api } from "encore.dev/api";

export const createOffer = api(
    { method: "POST", path: "/offers" },
    async ({ 
        applicationId, 
        salary, 
        workspaceId
    }: {
        applicationId: string;
        salary: number;
        workspaceId: string;
    }) => {
        try {
            const offer = await offerService.createOffer(applicationId, salary, workspaceId);
            return {
                message: "Created successfully", data: offer
            }
        }
        catch (error: any) {
            if (error.message === "EMPTY") {
                return {
                    message: "Application ID and salary are required",
                };
            }
            if (error.message === "INVALID_SALARY") {
                return {
                    message: "Salary must be greater than 0",
                };
            }
        }
    }
);

export const getOffers = api(
    { method: "GET", path: "/offers" },
    async ({ workspaceId }: { workspaceId: string }) => {
        try {
            const offers = await offerService.getOffers(workspaceId);
            return {
                offers
            }
        }
        catch (error: any) {
            if (error.message === "EMPTY") {
                return {
                    message: "Workspace ID is required",
                };
            }
        }
    }
);