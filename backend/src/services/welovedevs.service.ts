// import { env } from "../config/env";

const apiKey : string = process.env.TOKEN || "";
const headers = {
  'x-api-key': apiKey
};

export class WeLoveDevsService {
  /*
    GET ALL JOBS
  */
  static async getAllJobs(page = 0, size = 10, q = "") {    
    const url = new URL(`${process.env.baseUrl}/v1`)

    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());

    if (q) {
      url.searchParams.append("q", q);
    }

    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  }

  /*
    GET JOB BY ID
  */
static async getJobById(id: string) {
  const response = await fetch(
    `${process.env.baseUrl}/v1?page=0&size=100`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  const job = data.values.find(
    (job: any) => job.id === id
  );

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
}

  /*
    GET FILTERED JOBS
  */
  static async getFilteredJobs(filters: {
    q?: string;
    page?: number;
    size?: number;
  }) {
    const url = new URL(`${process.env.baseUrl}/v1`);

    if (filters.q) {
      url.searchParams.append("q", filters.q);
    }

    if (filters.page !== undefined) {
      url.searchParams.append("page", filters.page.toString());
    }

    if (filters.size !== undefined) {
      url.searchParams.append("size", filters.size.toString());
    }

    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch filtered jobs");
    }

    return response.json();
  }
}