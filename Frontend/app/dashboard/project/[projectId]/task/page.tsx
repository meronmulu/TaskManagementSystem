"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { getUserColumns } from "@/components/tasks/columns";
import { getTasksByProject } from "@/service/TaskService";
import { Task } from "@/app/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
 

export default function TaskPage() {
  const params = useParams();
  // console.log("Route Params:", params);
  const projectId = Number(params.projectId);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!projectId || isNaN(projectId)) {
      console.error("Invalid or missing projectId:", params.projectId);
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await getTasksByProject(projectId);
        console.log("Tasks:", res.data);
        setTasks(res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchTasks();
  }, [projectId]);

 const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );



  return (
    <div className="relative mx-auto w-full bg-white  rounded-xl mt-8">
      <div className="grid grid-cols-2 mb-4  p-5">
        <div>
            <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/project`}>
                Project
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Task</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        </div>

        <div className=" flex  flex-row justify-end gap-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2 w-1/2  bg-white"
        />
       
      
      {role !== "EMPLOYEE" && (
        <div className="mb-4 mr-4 flex justify-end">
          <Button>
            <Link href={`/dashboard/project/${projectId}/task/create`}>
              + Task
            </Link>
          </Button>
        </div>
      )}
      </div>
      </div>
      

      <DataTable<Task, unknown>
        columns={getUserColumns(setTasks)}
        data={filteredTasks}
      />
    </div>
  );
}
