import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";
import { useAuth } from "../../../context/authContext";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          setNotices(response.data.notices);
          console.log("Notices fetched:", response.data.notices);
        } else {
          setError("Failed to fetch notices");
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        setError(error.response?.data?.error || "Error fetching notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
        <div className="bg-blue-500 text-white p-4 rounded-full">
          <User className="w-8 h-8" />
        </div>
        <div>
          <p className="text-xl font-semibold">Welcome Back</p>
          <p className="text-2xl font-bold">{user?.name}</p>
        </div>
      </div>

      {/* Notices Section */}
      <div>
        <h2 className="text-2xl font-semibold">Notices</h2>
        
        {/* Loading and Error Handling */}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading notices...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-500">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No notices found.</div>
        ) : (
          <ul className="space-y-4 mt-4">
            {notices.map((notice) => (
              <li
                key={notice._id}
                className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600">{notice.title}</h3>
                <p className="mt-2 text-gray-700">{notice.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
