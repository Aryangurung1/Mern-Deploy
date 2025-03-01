import {
  Building2,
  CircleCheck,
  CircleX,
  FileText,
  Hourglass,
  User,
  Banknote,
} from "lucide-react";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:3000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 ">
      <h3 className="text-center text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<User />}
          text="Total Employees"
          number={summary.data.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<Building2 />}
          text="Total Departments"
          number={summary.data.totalDepartments}
          color="bg-blue-600"
        />
        <SummaryCard
          icon={<Banknote />}
          text="Monthly Salary"
          number={`$${summary.data.totalSalary}`}
          color="bg-green-500"
        />
      </div>
      <div className="mt-12">
        <h3 className="text-center text-2xl font-bold">Events & Holidays</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard
            icon={<User />}
            text="Events This Month"
            number={4}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<User />}
            text="Events This Year"
            number={35}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<User />}
            text="Holidays"
            number={15}
            color="bg-teal-600"
          />
        </div>
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FileText />}
            text="Leave Applied"
            number={summary.data.leaveSummary.appliedFor}
            color="bg-teal-500"
          />
          <SummaryCard
            icon={<CircleCheck />}
            text="Leave Approved"
            number={summary.data.leaveSummary.approved}
            color="bg-green-500"
          />
          <SummaryCard
            icon={<Hourglass />}
            text="Leave Pending"
            number={summary.data.leaveSummary.pending}
            color="bg-yellow-500"
          />
          <SummaryCard
            icon={<CircleX />}
            text="Leave Rejected"
            number={summary.data.leaveSummary.rejected}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
