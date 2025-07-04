"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/components/ui/badge";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("role") === "admin" ? "default" : "secondary"}
      >
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize text-sm text-muted-foreground">
        {row.getValue("status")}
      </span>
    ),
  },
];
