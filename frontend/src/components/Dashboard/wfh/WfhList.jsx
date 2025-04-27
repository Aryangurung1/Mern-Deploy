import axios from "axios";
import { useEffect, useState } from "react";
import { columns, WfhButtons } from "../../../utils/WfhHelper";
import DataTable from "react-data-table-component";
import { Search, Home, Loader2 } from "lucide-react";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#F3F4F6",
      fontSize: "14px",
      fontWeight: "bold",
      borderTopWidth: "1px",
      borderTopColor: "#E5E7EB",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#F9FAFB",
      },
      "&:hover": {
        backgroundColor: "#F3F4F6",
        cursor: "pointer",
      },
    },
  },
  pagination: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
    <p className="mt-2 text-gray-600">Loading WFH requests...</p>
  </div>
);

const WfhList = () => {
  const [wfhs, setWfhs] = useState(null);
  const [filteredWfhs, setFilteredWfhs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchWfhs = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable VITE_EMPORA_LINK is not set.");
        return;
      }

      const response = await axios.get(`${baseURL}/api/wfh`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.wfhs.map((wfh) => ({
          _id: wfh._id,
          sno: sno++,
          employeeId: wfh.employeeId.employeeId,
          name: wfh.employeeId.userId.name,
          department: wfh.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(wfh.endDate) - new Date(wfh.startDate)) /
              (1000 * 60 * 60 * 24)
          ),
          status: wfh.status,
          action: <WfhButtons Id={wfh._id} />,
        }));
        setWfhs(data);
        setFilteredWfhs(data);
      }
    } catch (error) {
      console.error("Error fetching wfhs:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWfhs();
  }, []);

  useEffect(() => {
    if (!wfhs) return;

    let filtered = wfhs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (wfh) =>
          wfh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wfh.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wfh.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (wfh) => wfh.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredWfhs(filtered);
  }, [searchTerm, statusFilter, wfhs]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">WFH Requests</h2>
          <Home className="w-6 h-6 text-gray-400" />
        </div>
        <div className="text-sm text-gray-500">
          Total Requests: {filteredWfhs?.length || 0}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter(statusFilter === "pending" ? "" : "pending")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === "approved" ? "" : "approved")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === "rejected" ? "" : "rejected")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              statusFilter === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Rejected
          </button>
          {statusFilter && (
            <button
              onClick={() => setStatusFilter("")}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <DataTable
          columns={columns}
          data={filteredWfhs || []}
          pagination
          customStyles={customStyles}
          noDataComponent={
            <div className="p-4 text-center text-gray-500">
              No WFH requests found
            </div>
          }
        />
      </div>
    </div>
  );
};

export default WfhList;
