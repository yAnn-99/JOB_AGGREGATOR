import { config } from "dotenv";

config();

const API_URL = process.env.API_URL;

export const fetchData = async () => {
  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  } 

  return response.json();
};