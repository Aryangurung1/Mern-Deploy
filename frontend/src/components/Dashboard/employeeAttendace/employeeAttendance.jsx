import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useParams } from "react-router-dom";
const EmployeeAttendance = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch employee attendance data
  const { data, isLoading, error } = useQuery({
    queryKey: ["employeeAttendance", filters, page],
    queryFn: async () => {
      const params = { ...filters, page, limit };

      if (!filters.startDate) delete params.startDate;
      if (!filters.endDate) delete params.endDate;

      const res = await axios.get(
        `http://localhost:3000/api/attendance/empattendance/${id}`,
        {
          params,
        }
      );
      return res.data;
    },
  });

  const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "day", header: "Day" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({
    data: data?.records ?? [], // Ensure it defaults to an empty array
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">My Attendance</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Holiday">Holiday</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />

        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setFilters({ status: "", startDate: "", endDate: "" })}
        >
          Clear Filters
        </button>
      </div>

      {/* Attendance Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data?.records || data.records.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
