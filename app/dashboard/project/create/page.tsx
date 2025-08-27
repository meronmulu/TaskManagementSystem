'use client';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
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
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { register } from "@/service/UserService";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CreateProjects } from "@/service/ProjectService";

const CreateProject = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            project_name: "",
            description: "",
            status: "PENDING", 
        }
    });

    const onSubmit = async (data: any) => {
        console.log("Form data:", data);

        const res = await CreateProjects(data);
        if (res) {
            console.log("Project registered successfully!");

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
                                    <BreadcrumbPage>Create Project</BreadcrumbPage>

                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-[60%] md:p-20 p-10">
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
                                            <Textarea  
                                               {...field}  
                                            placeholder="Enter project description"
                                            />
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
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
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

export default CreateProject;
