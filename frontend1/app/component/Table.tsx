"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

// Define props for CustomTable
interface CustomTableProps<T> {
  columns: { name: string; uid: keyof T }[];
  items: T[];
  renderCell: (item: T, columnKey: keyof T) => React.ReactNode;
}

export default function CustomTable<T>({ columns, items, renderCell }: CustomTableProps<T>) {
  return (
    <Table aria-label="Custom Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {items.length > 0 ? (
          items.map((item) => (
            <TableRow key={(item as any).id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
