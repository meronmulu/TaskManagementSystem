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

const CreateUser = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            password: "",
            email: "",
            role: "ADMIN"
        }
    });

    const onSubmit = async (data: any) => {
        console.log("Form data:", data);

        const res = await register(data);
        if (res) {
            console.log("User registered successfully!");

            form.reset();
            router.push("/dashboard/users");
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
                                    <Link href="/dashboard/users">User</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <BreadcrumbPage>Create User</BreadcrumbPage>

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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter name"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                                    <SelectItem value="MANAGER">Manager</SelectItem>
                                                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
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

export default CreateUser;
