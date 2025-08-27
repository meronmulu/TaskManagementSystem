"use client";

import { useEffect, useState } from "react";
import { Issue, Project } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/issue/columns"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllIssues } from "@/service/IssueService";
import { Input } from "@/components/ui/input";

export default function IssuePage() {
  const [issues, setIssue] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const res = await getAllIssues();
      console.log("IssueData:", res);
      setIssue(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  fetchIssues();
}, []);

 const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );



  return (
    <div className="relative mx-auto w-full bg-white  rounded-xl mt-8">
      <div className="mb-4 flex  flex-row justify-end p-5 gap-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/4 w-1/2  bg-white"
        />
        <Button>
          <Link href="/dashboard/issue/create">+ Issue</Link>
        </Button>
      </div>
      <DataTable columns={getUserColumns(setIssue)} data={filteredIssues} />
    </div>
  );
}
