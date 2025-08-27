"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { getProjectById, updateProject } from "@/service/ProjectService";
import { useEffect } from "react";

const EditProject = () => {
  const router = useRouter();
  const params = useParams();
  const project_id = params.projectId as string;
  const form = useForm({
    defaultValues: {
      project_name: "",
      description: "",
      status: "ADMIN",
    },
  });

  useEffect(() => {
  const fetchUser = async () => {
    if (!project_id || isNaN(Number(project_id))) {
      console.error("Invalid project_id:", project_id);
      return;
    }

    const project = await getProjectById(Number(project_id));
    if (project) {
      form.reset({
        project_name: project.project_name,
        description: project.description,
        status: project.status,
      });
    }
  };
  fetchUser();
}, [project_id, form]);


  const onSubmit = async (data: any) => {
    // console.log("Form data:", data);

    const res = await updateProject(Number(project_id),data);
    if (res) {
      console.log("Project Update successfully!");

      form.reset();
      router.push("/dashboard/project");
    } else {
      console.log("Something went wrong!");
    }
  };
  return (
    <>
      <div className="p-5">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/dashboard/project">Project</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbPage>Edit Project</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:w-[60%] md:p-20 p-10"
            >
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter project name"
                        {...field}
                        className=" !outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            IN_PROGRESS
                          </SelectItem>
                          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProject;
