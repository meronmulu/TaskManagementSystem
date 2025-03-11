import { Button, Form, Input} from "@heroui/react";
import React from "react";

export const roles = [
  { key: "ADMIN", label: "Admin" },
  { key: "MANAGER", label: "Manager" },
  { key: "EMPLOYEE", label: "Employee" },
];

const UpdateUser = () => {
  return (
    <div className="flex items-center justify-center my-auto h-screen bg-[#F7F8FA]">
      <Form className="w-full max-w-xl flex flex-col items-center bg-white p-10 rounded-lg">
        <h1 className="text-2xl font-semibold text-[#c9c9ce]">Create User</h1>

        <Input
          isRequired
          errorMessage="Full name must be at least 3 characters"
          label="Full Name"
          labelPlacement="outside"
          name="fullName"
          placeholder="Enter your full name"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

<div className="w-full">
  <label className="block text-sm font-medium text-gray-700">Role</label>
  <select
    required
    name="role"
    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="" disabled selected>
      Select a role
    </option>
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

export default UpdateUser;
