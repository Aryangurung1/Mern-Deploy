import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Leave add server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    
    // Check if role is admin or HR (both should have same access)
    if (role === "ADMIN" || role === "HR") {
      leaves = await Leave.find({ employeeId: id }).populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" },
        ],
      });
    } else if (role === "EMPLOYEE") {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }
      leaves = await Leave.find({ employeeId: employee._id }).populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" },
        ],
      });
    } else {
      return res.status(400).json({ success: false, error: "Invalid role" });
    }
    
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Get leave error:", error);
    res.status(500).json({ success: false, error: "Get leave server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get leave server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({_id: id}).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get leave server error" });
  }
}

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate({ _id: id }, {status: req.body.status})
    if(!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: " leave update server error" });
  }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
