import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/user.js";
import Leave from "../models/Leave.js";
import Wfh from "../models/Wfh.js";
import bcrypt from "bcrypt";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role, // Can be HR, Admin, etc.
    } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Ensure "roles" includes "employee" and selected roles
    const roles = Array.isArray(role) ? role : [role]; // Ensure roles is an array
    if (!roles.includes("employee")) {
      roles.push("employee"); // Add "employee" role if not present
    }

    // Create the User
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      roles,
      profileImage: req.file ? req.file.filename : "",
    });

    // Save the User
    const savedUser = await newUser.save();

    // Create the Employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    // Save the Employee
    await newEmployee.save();

    return res.status(200).json({ success: true, message: "Employee created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error in adding employee" });
  }
};


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee){
       employee = await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employees server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, department, salary }
    );

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    return res.status(200).json({ success: true, message: "Employee updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update employees server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee first to get the userId
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Delete all associated leaves
    await Leave.deleteMany({ employeeId: id });

    // Delete all associated WFH requests
    await Wfh.deleteMany({ employeeId: id });

    // Delete the associated user
    await User.findByIdAndDelete(employee.userId);

    // Delete the employee
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({ 
      success: true, 
      message: "Employee and all associated records deleted successfully" 
    });
  } catch (error) {
    console.error("Delete employee error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Delete employee server error" 
    });
  }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, deleteEmployee };
