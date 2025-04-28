import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

// Get all salaries with filters
export const getSalaries = async (req, res) => {
    try {
        const { search, month, department } = req.query;
        const query = {};

        // Add filters
        if (month) query.month = month;
        if (department) query.department = department;

        // If employee is viewing, show only their salaries
        if (req.user.role === "employee") {
            const employee = await Employee.findOne({ userId: req.user._id });
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            query.employeeId = employee._id;
        }

        const salaries = await Salary.find(query)
            .populate({
                path: "employeeId",
                select: "employeeId",
                populate: {
                    path: "userId",
                    select: "name email"
                }
            })
            .populate("department", "dep_name")
            .sort({ createdAt: -1 });

        // Apply name search filter only for admin/accountant view
        const filteredSalaries = req.user.role === "employee" ? salaries :
            search ? salaries.filter(salary =>
                salary.employeeId.userId.name.toLowerCase().includes(search.toLowerCase())
            ) : salaries;

        res.json(filteredSalaries);
    } catch (error) {
        console.error("Error in getSalaries:", error);
        res.status(500).json({ message: "Error fetching salaries" });
    }
};

// Distribute salary
export const distributeSalary = async (req, res) => {
    try {
        const { employeeId, month } = req.body;
        const year = new Date().getFullYear();

        // Check if salary already distributed
        const existingSalary = await Salary.findOne({
            employeeId,
            month,
            year
        });

        if (existingSalary) {
            return res.status(400).json({
                message: "Salary already distributed for this month"
            });
        }

        // Get employee details
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Convert month name to month number (0-11)
        const monthNumber = new Date(`${month} 1, 2000`).getMonth();
        
        // Create date range for the selected month
        const startOfMonth = new Date(year, monthNumber, 1);
        const endOfMonth = new Date(year, monthNumber + 1, 0);
        const daysInMonth = endOfMonth.getDate();

        // Get approved leaves for the month
        const leaves = await Leave.find({
            employeeId,
            status: "Approved",
            $or: [
                // Leave starts in the target month
                {
                    startDate: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                },
                // Leave ends in the target month
                {
                    endDate: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                },
                // Leave spans the entire month
                {
                    startDate: { $lte: startOfMonth },
                    endDate: { $gte: endOfMonth }
                }
            ]
        });

        // Calculate daily salary based on actual days in the month
        const dailySalary = employee.salary / daysInMonth;

        // Calculate leave deductions with detailed breakdown
        let totalLeaveDays = 0;
        let leaveBreakdown = [];

        leaves.forEach(leave => {
            const leaveStart = new Date(leave.startDate);
            const leaveEnd = new Date(leave.endDate);
            
            // Adjust dates to consider only days within the target month
            const effectiveStart = leaveStart < startOfMonth ? startOfMonth : leaveStart;
            const effectiveEnd = leaveEnd > endOfMonth ? endOfMonth : leaveEnd;
            
            const days = Math.ceil((effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24)) + 1;
            
            totalLeaveDays += days;
            leaveBreakdown.push({
                type: leave.leaveType,
                days: days,
                deduction: days * dailySalary
            });
        });

        const leaveDeduction = dailySalary * totalLeaveDays;

        // Calculate tax (13% of base salary)
        const taxDeduction = employee.salary * 0.13;

        // Calculate net salary
        const netSalary = employee.salary - leaveDeduction - taxDeduction;

        // Create salary record with leave breakdown
        const salary = new Salary({
            employeeId,
            department: employee.department,
            month,
            year,
            baseSalary: employee.salary,
            deductions: {
                leave: leaveDeduction,
                tax: taxDeduction,
                leaveBreakdown: leaveBreakdown // Store detailed leave breakdown
            },
            netSalary,
            totalLeaveDays,
            dailySalary
        });

        await salary.save();

        res.status(201).json({
            message: "Salary distributed successfully",
            salary: {
                ...salary.toObject(),
                leaveDetails: {
                    totalDays: totalLeaveDays,
                    dailyRate: dailySalary,
                    breakdown: leaveBreakdown
                }
            }
        });
    } catch (error) {
        console.error("Error in distributeSalary:", error);
        res.status(500).json({ message: "Error distributing salary" });
    }
}; 