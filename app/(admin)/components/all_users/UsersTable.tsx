"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import UserAvatar from "@/app/components/ui/UserAvatar";
import ActionButtons from "@/app/(admin)/components/all_users/ActionButtons";

import clientFetcher from "@/lib/clientFetcher";
import { User } from "@/types";

interface ApiResponse {
  users: User[];
  total: number;
}

export function UsersTable() {
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (page = 1, search = "") => {
      setLoading(true);
      const result: ApiResponse = await clientFetcher(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/all_users?page=${page}&limit=${perPage}&search=${search}`,
        "GET"
      );

      console.log(result);
      setData(result.users);
      setTotalRows(result.total);
      setLoading(false);
    },
    [perPage]
  );

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, perPage, searchTerm, fetchUsers]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const columns: TableColumn<User>[] = [
    {
      name: "Name",
      selector: (row) =>
        [row.firstName, row.middleName, row.lastName].filter(Boolean).join(" "),
      cell: (row) => (
        <Link
          href={`/admin/view_user/${row.id}`}
          className="flex items-center gap-3 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <UserAvatar
            src={row.profileImageUrl}
            alt={`${row.firstName?.[0] || ""}${row.lastName?.[0] || ""}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="flex-1 w-45 truncate">
            {[row.firstName, row.middleName || "", row.lastName]
              .filter(Boolean)
              .join(" ")}
          </span>
        </Link>
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
      selector: (row) => row.role,
      cell: (row) => (
        <Badge variant={row.role === "admin" ? "default" : "secondary"}>
          {row.role}
        </Badge>
      ),
      sortable: true,
      width: "7em",
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
      width: "8em",
    },
    {
      name: "Action",
      cell: (row) => <ActionButtons setData={setData} row={row} />,
      sortable: true,
      width: "11em",
    },
  ];

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage and review user accounts</CardDescription>
        </div>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        <div className="border-1 border-gray-300 rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={currentPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            highlightOnHover
            // striped
          />
        </div>
      </CardContent>
    </Card>
  );
}
