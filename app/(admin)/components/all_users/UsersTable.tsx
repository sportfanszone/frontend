"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

import clientFetcher from "@/lib/clientFetcher";

type User = any;

const columns: TableColumn<User>[] = [
  {
    name: "Name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.profileImageUrl || "/images/blankProfile.png"}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
          width={200}
          height={200}
        />
        <span>
          {[row.firstName, row.middleName, row.lastName]
            .filter(Boolean)
            .join(" ")}
        </span>
      </div>
    ),
    sortable: true,
  },
  { name: "Username", selector: (row) => row.email, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
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
      <Badge variant={row.status === "admin" ? "outline" : "secondary"}>
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        {row.status}
      </Badge>
    ),
    sortable: true,
  },
];

export function UsersTable() {
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    const result: any = await clientFetcher(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/all_users?page=${page}&limit=${perPage}&search=${search}`,
      "GET"
    );

    console.log(result);
    setData(result.users);
    setTotalRows(result.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, perPage, searchTerm]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

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
