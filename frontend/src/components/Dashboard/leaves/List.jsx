import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import { CalendarDays, Plus, Loader2, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { months, filterByMonth } from "../../../utils/DateHelper";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState("");
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  // Check if we're in employee view (URL contains employee-dashboard)
  const isEmployeeView = window.location.pathname.includes('employee-dashboard');

  const fetchLeaves = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable VITE_EMPORA_LINK is not set.");
        return;
      }

      // Get the correct ID based on view type
      const userId = isEmployeeView ? user?._id : id;
      
      if (!userId) {
        toast.error("User ID is missing");
        return;
      }

      // Get the role, defaulting to "EMPLOYEE" for employee view
      const role = isEmployeeView ? "EMPLOYEE" : "ADMIN";

      const response = await axios.get(
        `${baseURL}/api/leave/${userId}/${role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves || []);
        setFilteredLeaves(response.data.leaves || []);
      } else {
        toast.error(response.data.error || "Failed to fetch leaves");
        setLeaves([]);
        setFilteredLeaves([]);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to fetch leave records");
      }
      setLeaves([]);
      setFilteredLeaves([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id, user]);

  useEffect(() => {
    let filtered = leaves;
    filtered = filterByMonth(filtered, monthFilter);
    setFilteredLeaves(filtered);
  }, [monthFilter, leaves]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">Leave History</h2>
          <CalendarDays className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none cursor-pointer"
            >
              {months.map((month) => (
                <option key={month.label} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {isEmployeeView && (
            <Link
              to="/employee-dashboard/add-leave"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Leave Request
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">SNO</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Leave Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">From</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{sno++}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{leave.leaveType}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{leave.reason}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : leave.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredLeaves.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
