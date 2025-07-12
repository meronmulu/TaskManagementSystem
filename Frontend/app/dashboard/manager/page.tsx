"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig, CircleDashed, CircleDotDashed } from "lucide-react";
import axios from "@/app/axios"; 

function ManagerDashboard() {
  const [summary, setSummary] = useState({
    totalProjects: 0,
    totalTasks: 0,
    totalIssues: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/dashboard/manager-summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
      }
    };

    fetchSummary();
  }, []);

  const statusSummary = [
    {
      img: <CircleDashed />,
      totalNumber: summary.totalProjects,
      title: "Total Projects",
    },
    {
      img: <CircleDotDashed />,
      totalNumber: summary.totalTasks,
      title: "Total Tasks",
    },
    {
      img: <CircleCheckBig />,
      totalNumber: summary.totalIssues,
      title: "Total Issues",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["MANAGER", "ADMIN"]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {statusSummary.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div>{item.img}</div>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.totalNumber}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ProtectedRoute>
  );
}

export default ManagerDashboard;
