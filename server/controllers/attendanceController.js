import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import moment from "moment-timezone";

// Function to get the day of the week
const getDayOfWeek = (date) => {
    return moment(date).tz("Asia/Kathmandu").format("dddd");
};

export const markDailyAttendance = async () => {
    try {
        const today = moment().tz("Asia/Kathmandu").startOf("day"); // No `.toDate()`, store as moment object
        const formattedDate = today.format("YYYY-MM-DD"); // Store as string to avoid UTC shifts
        const day = getDayOfWeek(today);
        const isHoliday = day === "Saturday";

        console.log("Today's Date (Nepal Time):", formattedDate);

        const employees = await Employee.find().populate("userId").populate("department");

        for (const emp of employees) {
            if (!emp.userId || !emp.userId.name) {
                console.warn(`Skipping attendance for employee ${emp._id}, userId or name is missing.`);
                continue;
            }

            console.log(`Checking leave for employee: ${emp._id}`);

            // Check for any approved leaves that overlap with today
            const leaveDetails = await Leave.find({
                employeeId: emp._id,
                status: "Approved",
                $or: [
                    {
                        startDate: { $lte: formattedDate },
                        endDate: { $gte: formattedDate }
                    }
                ]
            });

            // If any approved leave exists for today, mark as "On Leave"
            const isOnLeave = leaveDetails.length > 0;
            console.log("Found Leave:", isOnLeave);

            const status = isOnLeave ? "On Leave" : (isHoliday ? "Holiday" : "Present");

            // Check for existing attendance
            const existingAttendance = await Attendance.findOne({
                employeeId: emp._id,
                date: formattedDate
            });

            if (!existingAttendance) {
                await Attendance.create({
                    employeeId: emp._id,
                    employeeName: emp.userId.name,
                    departmentName: emp.department ? emp.department.dep_name : "Unknown",
                    date: formattedDate,
                    day,
                    status
                });
            }
        }

        console.log("✅ Daily attendance recorded.");
    } catch (error) {
        console.error("❌ Error marking attendance:", error);
    }
};



// Mark attendance manually (Present)
export const markAttendance = async (req, res) => {
    const { employeeId } = req.body;
    try {
        const employee = await Employee.findById(employeeId).populate("department");

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const today = new Date();
        const day = getDayOfWeek(today);
        const existingAttendance = await Attendance.findOne({ employeeId, date: today });

        if (existingAttendance) {
            existingAttendance.status = "Present";
            await existingAttendance.save();
            return res.status(200).json({ message: "Attendance updated to Present" });
        }

        await Attendance.create({
            employeeId: employee._id,
            employeeName: employee.userId.name,
            departmentName: employee.department.dep_name,
            date: today,
            day,
            status: "Present"
        });

        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error marking attendance", error });
    }
};

export const getAttendanceRecords = async (req, res) => {
    try {
        const { search, department, status, startDate, endDate, page = 1, limit = 10 } = req.query;

        const filter = {};

        if (search) {
            filter.employeeName = { $regex: search, $options: "i" };
        }

        if (department) filter.departmentName = department;
        if (status) filter.status = status;

        // Handle date range filtering
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const skip = (page - 1) * limit;

        const records = await Attendance.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalRecords = await Attendance.countDocuments(filter);

        res.json({
            records,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getEmployeeAttendance = async (req, res) => {
    try {
        const { status, startDate, endDate, page = 1, limit = 10 } = req.query;
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const filter = { employeeId: employee._id };

        if (status) filter.status = status;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const skip = (page - 1) * limit;

        const records = await Attendance.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(Number(limit));

        const totalRecords = await Attendance.countDocuments(filter);

        res.json({
            records,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



