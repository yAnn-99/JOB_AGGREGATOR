import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  apiKey: process.env.WELOVEDEVS_API_KEY || "",
  baseUrl: process.env.WELOVEDEVS_BASE_URL || "",
};