"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input } from "@/app/components/ui/input";

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
  { name: "Role", selector: (row) => row.role, sortable: true },
  { name: "Status", selector: (row) => row.status, sortable: true },
];

export function UsersTable() {
  const [data, setData] = useState<User[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/all_users?page=${page}&limit=${perPage}&search=${search}`
    );
    const result = await res.json();
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
    <div className="space-y-4">
      <div>
        <h1 className="font-bold text-xl mb-6">All Users</h1>

        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border-1 border-gray-300 rounded-2xl overflow-hidden">
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
          striped
        />
      </div>
    </div>
  );
}
