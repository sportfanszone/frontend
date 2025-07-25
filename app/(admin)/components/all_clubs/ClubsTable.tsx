"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
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
import UserAvatar from "@/app/components/ui/UserAvatar";
import ActionButtons from "@/app/(admin)/components/all_clubs/ActionButtons";
import { Badge } from "@/app/components/ui/badge";
import { IconPinned } from "@tabler/icons-react";

import clientFetcher from "@/lib/clientFetcher";

type User = any;

export function ClubsTable() {
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const columns: TableColumn<User>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => (
        <Link
          href={`/admin/view_club/${row?.id}`}
          className="flex items-center gap-3 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <UserAvatar
            src={row.logo}
            alt={row.name?.[0]}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="flex-1 w-45 truncate">{row.name}</span>
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Last Activity",
      selector: (row) =>
        moment(row.lastAccess).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      name: "Pinned",
      selector: (row) => row.pinned,
      cell: (row) => (
        <Badge variant="secondary">
          <IconPinned
            className={`${
              row.pinned
                ? "fill-green-500 dark:fill-green-400"
                : "fill-red-500 dark:fill-red-400"
            }`}
          />
          {row.pinned ? "Pinned" : "Unpinned"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <ActionButtons row={row} setData={setData} />,
      sortable: true,
      width: "11em",
    },
  ];

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    const result: any = await clientFetcher(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/all_clubs?page=${page}&limit=${perPage}&search=${search}`,
      "GET"
    );

    console.log(result);
    setData(result.clubs);
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
          <CardTitle>Clubs</CardTitle>
          <CardDescription>Manage and review club accounts</CardDescription>
        </div>
        <Input
          placeholder="Search clubs..."
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
