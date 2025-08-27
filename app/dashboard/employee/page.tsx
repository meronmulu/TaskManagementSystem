"use client";

import { Task } from "@/app/types";
import { DataTable } from "@/components/data-table";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getTasksByUser } from "@/service/TaskService";
import React, { useEffect, useState } from "react";
import { getUserColumns } from "@/components/tasks/columns";
import { CircleCheckBig, CircleDashed, CircleDotDashed } from "lucide-react";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

 useEffect(() => {
  const fetchTasks = async () => {
    if (!user?.userId) return;

    try {
      const data = await getTasksByUser(user.userId);
      
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]); 
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
    }
  };

  fetchTasks();
}, [user?.userId]);


  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const statusSummary = [
    {
      img: <CircleDashed />,
      totalNumber: safeTasks.filter((task) => task.status === "PENDING").length,
      status: "Pending",
    },
    {
      img: <CircleDotDashed />,
      totalNumber: safeTasks.filter((task) => task.status === "IN_PROGRESS").length,
      status: "In Progress",
    },
    {
      img: <CircleCheckBig />,
      totalNumber: safeTasks.filter((task) => task.status === "COMPLETED").length,
      status: "Completed",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {statusSummary.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div>{item.img}</div>
              <div>
                <CardTitle>{item.totalNumber}</CardTitle>
                <CardDescription>{item.status}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ProtectedRoute>
  );
}

export default EmployeeDashboard;
