import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable REACT_APP_EMPORA_LINK is not set.");
        return;
      }
        const response = await axios.get(
          `${baseURL}/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`, {status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/leaves');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
                alt="User"
                className="w-72 h-72 object-cover  shadow-md"
              />
            </div>

            {/* Employee Info */}
            <div className="space-y-2">
              <div className="flex">
                <p className="text-lg font-bold w-40">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">LeaveType:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">Reason:</p>
                <p className="font-medium capitalize">{leave.reason}</p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">Start Date:</p>
                <p className="font-medium capitalize">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">End Date:</p>
                <p className="font-medium capitalize">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                <p className="text-lg font-bold w-40">
                  {leave.status === "Pending" ? "Action" : "Status"}:
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-0.5 bg-green-400 hover:bg-green-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to approve this leave?")) {
                          changeStatus(leave._id, "Approved");
                        }
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="px-2 py-0.5 bg-red-400 hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to reject this leave?")) {
                          changeStatus(leave._id, "Rejected");
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default LeaveDetail;
