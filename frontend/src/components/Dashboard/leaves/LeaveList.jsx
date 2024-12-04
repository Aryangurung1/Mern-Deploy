import axios from "axios";
import { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK; // Access the environment variable
      if (!baseURL) {
        console.error("Environment variable REACT_APP_EMPORA_LINK is not set.");
        return;
      }

      const response = await axios.get(`${baseURL}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center pb-3">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        <div className="space-x-3 text-white">
          <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700">Pending</button>
          <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700">Approved</button>
          <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700">Rejected</button>
        </div>
      </div>
      <div className="mt-3">
        <DataTable columns={columns} data={leaves} pagination />
      </div>
    </div>
  );
};

export default LeaveList;
