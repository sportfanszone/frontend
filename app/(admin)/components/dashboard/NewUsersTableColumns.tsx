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

const users: User[] = [
  {
    id: "1",
    name: "Chisom Njoku",
    email: "chisom@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Blessing Ojo",
    email: "blessing@example.com",
    role: "user",
    status: "inactive",
  },
  {
    id: "3",
    name: "Tunde James",
    email: "tunde@example.com",
    role: "user",
    status: "active",
  },
];

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
