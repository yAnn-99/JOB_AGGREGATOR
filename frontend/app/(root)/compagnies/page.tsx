"use client";

import Card from "@/component/card";
import type { Job } from "@/types/jobType";
import { useEffect, useState } from "react";

type JobsResponse = {
  values: Job[];
};

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [search, setSearch] = useState("");
  const [remote, setRemote] = useState("all");

  const url = "http://localhost:3000/api/jobs";

  useEffect(() => {
    const fetchjob = async () => {
      try {
        const reponse = await fetch(url);
        const resultat: JobsResponse = await reponse.json();
        setJobs(resultat.values);
        setFilteredJobs(resultat.values);
      } catch (error) {
        console.error(error);
      }
    };

    fetchjob();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (search) {
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(search.toLowerCase()) ||
          job.smallCompany?.companyName
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (remote !== "all") {
      result = result.filter(
        (job) => job.details?.remotePolicy?.frequency === remote,
      );
    }

    setFilteredJobs(result);
  }, [search, remote, jobs]);

  return (
    <main className="p-4">
      <div className="mb-4 flex gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={remote}
          onChange={(e) => setRemote(e.target.value)}
        >
          <option value="all">All</option>
          <option value="fullTime">Full remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,250px))] gap-4">
        {filteredJobs.map((element, index) => (
          <Card key={index} job={element} />
        ))}
      </div>
    </main>
  );
};

export default Page;
