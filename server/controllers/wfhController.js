import Wfh from "../models/Wfh.js";
import Employee from "../models/Employee.js";

const addWfh = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newWfh = new Wfh({
      employeeId: employee._id,
      startDate,
      endDate,
      reason,
    });

    await newWfh.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Wfh add server error" });
  }
};

const getWfh = async (req, res) => {
  try {
    const { id, role } = req.params;
    let wfhs
    if(role === "admin") {
      wfhs = await Wfh.find({ employeeId: id });
    } else {
      const employee = await Employee.findOne({ userId: id });
      wfhs = await Wfh.find({ employeeId: employee._id });
    }
    
    return res.status(200).json({ success: true, wfhs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Get wfh server error" });
  }
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
