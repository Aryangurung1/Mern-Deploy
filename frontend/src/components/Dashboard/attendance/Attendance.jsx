 import { useState, useEffect, useRef } from "react"; 
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const AttendanceTable = () => {
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [searchText, setSearchText] = useState(""); // Local search input state
  const debounceTimeout = useRef(null); // Store debounce timer
  const [page, setPage] = useState(1);
  const limit = 10;

  // Debounce Effect: Updates filters after user stops typing
  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchText }));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(debounceTimeout.current);
  }, [searchText]);

  // Fetch attendance data
  const { data, isLoading, error } = useQuery({
    queryKey: ["attendance", filters, page],
    queryFn: async () => {
      const params = { ...filters, page, limit };
      if (!filters.startDate) delete params.startDate;
      if (!filters.endDate) delete params.endDate;

      const res = await axios.get(
        "http://localhost:3000/api/attendance/records",
        { params }
      );
      return res.data;
    },
  });

  const columns = [
    { accessorKey: "employeeName", header: "Employee Name" },
    { accessorKey: "departmentName", header: "Department" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "day", header: "Day" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({
    data: data?.records || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Employee Attendance</h2>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search Input with Debounce */}
        <input
          type="text"
          placeholder="Search Employee..."
          className="border p-2 rounded"
          value={searchText} // Controlled input
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filters.department}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, department: e.target.value }))
          }
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Holiday">Holiday</option>
        </select>

        {/* Date Range Filters */}
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.endDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />

        {/* Clear Filters Button */}
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => {
            setFilters({
              search: "",
              department: "",
              status: "",
              startDate: "",
              endDate: "",
            });
            setSearchText("");
          }}
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
          disabled={data?.records.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
