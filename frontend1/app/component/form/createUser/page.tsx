"use client";

import { register } from "@/app/services/UserServices";
import { Button, Form, Input } from "@heroui/react";
import React, { useState } from "react";

export const roles = [
  { key: "ADMIN", label: "Admin" },
  { key: "MANAGER", label: "Manager" },
  { key: "EMPLOYEE", label: "Employee" },
];

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",  // ✅ Changed from `name` to `fullName` to match input name
    email: "",
    password: "",
    role: "ADMIN",
  });

  // ✅ Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register()
      console.log("User Created:", res);
      alert("User Created Successfully!");
      setFormData({ fullName: "", email: "", password: "", role: "ADMIN" }); 
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  return (
    <div className="flex items-center justify-center my-auto h-screen bg-[#F7F8FA]">
      <Form className="w-full max-w-xl flex flex-col items-center bg-white p-10 rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-[#c9c9ce]">Create User</h1>

        {/* ✅ Corrected Inputs */}
        <Input
          isRequired
          errorMessage="Full name must be at least 3 characters"
          label="Full Name"
          labelPlacement="outside"
          name="fullName"  // ✅ Matches state key
          placeholder="Enter your full name"
          type="text"
          value={formData.fullName}  // ✅ Each input has a unique value
          onChange={handleChange}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"  // ✅ Matches state key
          placeholder="Enter your email"
          type="email"
          value={formData.email}  // ✅ Correct state binding
          onChange={handleChange}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"  // ✅ Matches state key
          placeholder="Enter your password"
          type="password"
          value={formData.password}  // ✅ Correct state binding
          onChange={handleChange}
        />

        {/* ✅ Corrected Select Dropdown */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"  // ✅ Matches state key
            value={formData.role}  // ✅ Correct state binding
            onChange={handleChange}  // ✅ Uses generic handler
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a role</option>
            {roles.map((role) => (
              <option key={role.key} value={role.key}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="bordered" className="bg-[#6256E3] text-white">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
