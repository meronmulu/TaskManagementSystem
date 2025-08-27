"use client";

import { useEffect, useState } from "react";
import { Project } from "@/app/types/index";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/projects/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllProjects } from "@/service/ProjectService";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

export default function ProjectPage() {
  const [projects, setProject] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="container relative mx-auto w-full bg-white  rounded-xl mt-8">
      <div className="mb-4 flex  flex-row justify-end p-5 gap-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/4 w-1/2  bg-white"
        />

        {role !== "EMPLOYEE" && (
          <Button>
            <Link href="/dashboard/project/create">+ Project</Link>
          </Button>
        )}
      </div>

      <DataTable columns={getUserColumns(setProject)} data={filteredProjects} />
    </div>
  );
}
