"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import socket from "@/lib/socket";
import { Card } from "./ui/card";
import img from "../public/Taskful.gif";
import Image from "next/image";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { login, user } = useAuth();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const res = await login(data);

    if (res) {
      const userInStorage = JSON.parse(localStorage.getItem("user") || "{}");

      // ✅ JOIN SOCKET ROOM
      if (userInStorage?.userId) {
        socket.emit("joinRoom", userInStorage.userId);
        console.log("🔌 Joined socket room:", userInStorage.userId);
      }

      // redirect based on role
      switch (userInStorage.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "MANAGER":
          router.push("/dashboard/manager");
          break;
        case "EMPLOYEE":
          router.push("/dashboard/employee");
          break;
        default:
          router.push("/");
      }
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
      <div className="flex flex-row justify-center items-center h-screen  ">
        <div>
          <Image
            src={img}
            alt="Taskful Logo"
            width={500}
            height={200}
            priority
          />
        </div>
        <div className="px-5">
          <p className="text-center font-bold text-3xl mb-5">Welcome Back</p>
          <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                        className="w-[400px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
  );
};

export default Login;
