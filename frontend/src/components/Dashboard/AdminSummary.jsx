import {
  Users,
  Building2,
  CircleCheck,
  XCircle,
  FileText,
  Clock,
  Wallet,
  CalendarDays,
  CalendarCheck,
  Palmtree
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-12">
      {/* Company Overview Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <Users className="w-8 h-8 mr-3 text-teal-600" strokeWidth={1.5} />
          <span>Company Overview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            icon={<Users strokeWidth={1.5} />}
            text="Total Employees"
            number={summary.data.totalEmployees}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<Building2 strokeWidth={1.5} />}
            text="Total Departments"
            number={summary.data.totalDepartments}
            color="bg-indigo-600"
          />
          <SummaryCard
            icon={<Wallet strokeWidth={1.5} />}
            text="Monthly Salary"
            number={`$${summary.data.totalSalary}`}
            color="bg-emerald-600"
          />
        </div>
      </div>


      {/* Leave Details Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <FileText className="w-8 h-8 mr-3 text-emerald-600" strokeWidth={1.5} />
          <span>Leave Management</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard
            icon={<FileText strokeWidth={1.5} />}
            text="Leave Applied"
            number={summary.data.leaveSummary.appliedFor}
            color="bg-blue-600"
          />
          <SummaryCard
            icon={<CircleCheck strokeWidth={1.5} />}
            text="Leave Approved"
            number={summary.data.leaveSummary.approved}
            color="bg-emerald-600"
          />
          <SummaryCard
            icon={<Clock strokeWidth={1.5} />}
            text="Leave Pending"
            number={summary.data.leaveSummary.pending}
            color="bg-amber-500"
          />
          <SummaryCard
            icon={<XCircle strokeWidth={1.5} />}
            text="Leave Rejected"
            number={summary.data.leaveSummary.rejected}
            color="bg-rose-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
