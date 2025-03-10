"use client"
import React from "react";
import {Form, Input, Button, Select, SelectItem} from "@heroui/react";
export const roles = [
  {key: "ADMIN", label: "Admin"},
  {key: "MANAGER", label: "Manager"},
  {key: "EMPLOYEE", label: "Employee"},
]
export default function App() {
  // const [submitted, setSubmitted] = React.useState(null);

 

  return (
    <Form className="w-full max-w-xs" >
      <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="Full Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your email"
        type="string"
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
      <Select
      className="max-w-xs"
      items={roles}
      label="Favorite Animal"
      placeholder="Select an role"
    >
      {(role) => <SelectItem>{role.label}</SelectItem>}
    </Select>
      <Button type="submit" variant="bordered">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}

