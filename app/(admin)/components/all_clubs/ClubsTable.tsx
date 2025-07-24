"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/app/components/ui/badge";
import { IconEdit, IconKey, IconForbid2, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import UserAvatar from "@/app/components/ui/UserAvatar";

import clientFetcher from "@/lib/clientFetcher";

type User = any;

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
    selector: (row) => moment(row.lastAccess).format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    name: "Action",
    cell: () => (
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-green-400 hover:bg-green-500 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tl-lg rounded-bl-lg">
              <IconEdit stroke={3} className="text-white  text-4xl" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Edit user</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-gray-400 hover:bg-gray-500 cursor-pointer size-7 flex items-center justify-center rounded-none">
              <IconKey stroke={3} className="text-white  text-4xl" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Edit user password</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer size-7 flex items-center justify-center rounded-none">
              <IconForbid2 stroke={3} className="text-white  text-4xl" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Disable user</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-red-500 hover:bg-red-600 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tr-lg rounded-br-lg">
              <IconTrash stroke={3} className="text-white  text-4xl" />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Delete user</TooltipContent>
        </Tooltip>
      </div>
    ),
    sortable: true,
    width: "11em",
  },
];

export function ClubsTable() {
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
