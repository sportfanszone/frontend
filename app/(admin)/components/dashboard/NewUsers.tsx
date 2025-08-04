"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Button } from "@/app/components/ui/button";
import { User } from "@/types";

interface ApiResponse {
  users: User[];
}

const columns: TableColumn<User>[] = [
  {
    name: "Name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.profileImageUrl || "/images/blankProfile.png"}
          alt={`${row.firstName} ${row.lastName}`}
          className="w-8 h-8 rounded-full object-cover"
          width={32}
          height={32}
        />
        <span>
          {[row.firstName, row.middleName || "", row.lastName]
            .filter(Boolean)
            .join(" ")}
        </span>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    cell: (row) => (
      <Badge variant={row.role === "admin" ? "default" : "secondary"}>
        {row.role}
      </Badge>
    ),
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => (
      <Badge variant="secondary">
        <IconCircleCheckFilled
          className={`${
            row.status === "active"
              ? "fill-green-500 dark:fill-green-400"
              : "fill-red-500 dark:fill-red-400"
          }`}
        />
        {row.status}
      </Badge>
    ),
    sortable: true,
  },
];

export function UsersTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/all_users?limit=5`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const result: ApiResponse = await res.json();
      setData(result.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage and review user accounts</CardDescription>
        </div>
        <Button className="cursor-pointer">
          <Link href="/admin/all_users">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border-1 border-gray-300 rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            highlightOnHover
          />
        </div>
      </CardContent>
    </Card>
  );
}
