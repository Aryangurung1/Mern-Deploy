import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const totalDepartments = await Department.countDocuments();

    const totalSalaries = await Employee.aggregate([
    {$group: {_id: null, totalSalary: {$sum: "$salary"}}}  
    ])

    // Get the first and last day of the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const leaveStatus = await Leave.aggregate([
      {
        $match: {
          appliedAt: { $gte: firstDay, $lte: lastDay }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        }
      },
    ]);

    const leaveSummary = {
      appliedFor: leaveStatus.reduce((total, item) => total + item.count, 0),
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    }

    return res.status(200).json({ success: true, totalEmployees, totalDepartments, totalSalary: totalSalaries[0]?.totalSalary || 0 , leaveSummary });

  }catch(error) {
    return res.status(500).json({ success: false, error: "Dashboard summary server error" });
  }
};

export { getSummary };