"use client";

import { useEffect, useState } from "react";
import { Project } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/projects/columns"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllProjects } from "@/service/ProjectService";
import { useAuth } from "@/context/AuthContext";

export default function ProjectPage() {
  const [projects, setProject] = useState<Project[]>([]);
  const { user } = useAuth();
    const role = user?.role?.toUpperCase();

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      // console.log("projectData:", res);
      setProject(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  fetchProjects();
}, []);



  return (
    <div className="container mx-auto py-10">
      role !=== "ADMIN" ? (
      <div className="mb-4 mr-4 flex justify-end">
        <Button>
          <Link href="/dashboard/project/create">+ Project</Link>
        </Button>
      </div>): (
        
       
      <DataTable columns={getUserColumns(setProject)} data={projects} />
    </div>
  );
}
