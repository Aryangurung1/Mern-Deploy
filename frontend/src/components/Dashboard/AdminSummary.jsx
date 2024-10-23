import { Banknote, Building2, CircleCheck, CircleX, FileText, Hourglass, User,  } from "lucide-react"
import SummaryCard from "./SummaryCard"

const AdminSummary = () => {
  return (
    <div className="p-6 ">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<User />} text="Total Employees" number={15} color="bg-teal-600"/>
        <SummaryCard icon={<Building2 />} text="Total Departments" number={5} color="bg-blue-600"/>
        <SummaryCard icon={<Banknote />} text="Monthly Salary" number='$5000' color="bg-green-500"/>
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FileText />} text="Leave Applied" number={5} color="bg-teal-500"/>
          <SummaryCard icon={<CircleCheck />} text="Leave Approved" number={5} color="bg-green-500"/>
          <SummaryCard icon={<Hourglass />} text="Leave Pending" number={5} color="bg-yellow-500"/>
          <SummaryCard icon={<CircleX />} text="Leave Rejected" number={5} color="bg-red-500"/>
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
