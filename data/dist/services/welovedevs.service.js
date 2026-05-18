import { env } from "../config/env.ts";
const headers = {
    "x-api-key": env.apiKey,
};
export class WeLoveDevsService {
    static async fetchJobs() {
        const response = await fetch(`${env.baseUrl}/v1?page=0&size=100`, {
            headers,
        });
        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }
        return response.json();
    }
}
