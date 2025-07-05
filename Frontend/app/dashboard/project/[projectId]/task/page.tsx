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

export default function TaskPage() {
  const params = useParams();
  console.log("Route Params:", params);

  const projectId = Number(params.projectId);

  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
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
      <div className="mb-4 mr-4 flex justify-end">
        <Button>
          <Link href={`/dashboard/project/${projectId}/task/create`}>
            + Task
          </Link>
        </Button> 
      </div>
      <DataTable<Task, unknown>
        columns={getUserColumns(setTasks)}
        data={tasks}
      />
    </div>
  );
}
