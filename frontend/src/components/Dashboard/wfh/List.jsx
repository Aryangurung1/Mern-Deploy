import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import { Home, Plus, Loader2 } from "lucide-react";

const List = () => {
  const [wfhs, setWfhs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchWfhs = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable VITE_EMPORA_LINK is not set.");
        return;
      }
      const response = await axios.get(
        `${baseURL}/api/wfh/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setWfhs(response.data.wfhs);
      }
    } catch (error) {
      console.error("Error fetching WFH requests:", error);
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWfhs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!wfhs) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No WFH requests found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">WFH History</h2>
          <Home className="w-6 h-6 text-gray-400" />
        </div>
        {user.roles.includes("employee") && (
          <Link
            to="/employee-dashboard/add-wfh"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            New WFH Request
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">SNO</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">From</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {wfhs.map((wfh) => (
              <tr key={wfh._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{sno++}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(wfh.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(wfh.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{wfh.reason}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    wfh.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : wfh.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {wfh.status}
                  </span>
                </td>
              </tr>
            ))}
            {wfhs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No WFH requests found
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
