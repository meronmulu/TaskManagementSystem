"use client";

import { useEffect, useState } from "react";
import { Issue, Project } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/issue/columns"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllIssues } from "@/service/IssueService";

export default function IssuePage() {
  const [issues, setIssue] = useState<Issue[]>([]);

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



  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 mr-4 flex justify-end">
        <Button>
          <Link href="/dashboard/issue/create">+ Issue</Link>
        </Button>
      </div>
      <DataTable columns={getUserColumns(setIssue)} data={issues} />
    </div>
  );
}
