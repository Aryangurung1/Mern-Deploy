import Wfh from "../models/Wfh.js";
import Employee from "../models/Employee.js";

const MAX_WFH_CREDITS = 5; // Maximum WFH credits per month

const addWfh = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    // Calculate the number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Get the month and year for credit tracking
    const monthYear = `${start.getMonth() + 1}-${start.getFullYear()}`;

    // Check remaining credits
    const usedCredits = await getUsedCredits(employee._id, monthYear);
    if (usedCredits + daysCount > MAX_WFH_CREDITS) {
      return res.status(400).json({ 
        success: false, 
        error: `Insufficient WFH credits. You have ${MAX_WFH_CREDITS - usedCredits} credits remaining this month.` 
      });
    }

    const newWfh = new Wfh({
      employeeId: employee._id,
      startDate,
      endDate,
      reason,
      monthYear,
      daysCount
    });

    await newWfh.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "WFH add server error" });
  }
};

const getWfh = async (req, res) => {
  try {
    const { id, role } = req.params;
    let wfhs;
    let employee;
    
    if(role === "admin") {
      wfhs = await Wfh.find({ employeeId: id });
      employee = await Employee.findById(id);
    } else {
      employee = await Employee.findOne({ userId: id });
      wfhs = await Wfh.find({ employeeId: employee._id });
    }

    // Get remaining credits for current month
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthYear = `${currentMonth}-${currentYear}`;
    const usedCredits = await getUsedCredits(employee._id, monthYear);
    const remainingCredits = MAX_WFH_CREDITS - usedCredits;
    
    return res.status(200).json({ 
      success: true, 
      wfhs,
      credits: {
        total: MAX_WFH_CREDITS,
        used: usedCredits,
        remaining: remainingCredits
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Get WFH server error" });
  }
};

// Helper function to get used credits for a month
const getUsedCredits = async (employeeId, monthYear) => {
  const approvedWfhs = await Wfh.find({
    employeeId,
    monthYear,
    status: "Approved"
  });
  
  return approvedWfhs.reduce((total, wfh) => total + wfh.daysCount, 0);
};

const getWfhs = async (req, res) => {
  try {
    const wfhs = await Wfh.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });
    return res.status(200).json({ success: true, wfhs });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get wfh server error" });
  }
};

const getWfhDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const wfh = await Wfh.findById({_id: id}).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });
    return res.status(200).json({ success: true, wfh });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get wfh server error" });
  }
}

const updateWfh = async (req, res) => {
  try {
    const { id } = req.params;
    const wfh = await Wfh.findByIdAndUpdate({ _id: id }, {status: req.body.status})
    if(!wfh) {
      return res.status(404).json({ success: false, error: "Wfh not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: " wfh update server error" });
  }
}

export { addWfh, getWfh, getWfhs, getWfhDetail, updateWfh };
