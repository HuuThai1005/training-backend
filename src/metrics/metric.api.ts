import { api } from "encore.dev/api" 
export const getMetrics = api ({
    method: "GET",
    path: "/metrics"
}, async() => {
    return {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
    }
})