import Department from "../models/Department.js";
import Employee from "../models/Employee.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch(error) {
        return res.status(500).json({success: false, error: "Get departments server error"})
    }
}


const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ 
        dep_name,
        description
     })
    await newDep.save()
    return res.status(200).json({success:true, department: newDep})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try{
    const { id } = req.params;
    const department = await Department.findById({_id: id})
    return res.status(200).json({success: true, department})
  } catch(error) {
      return res.status(500).json({success: false, error: "Get department server error"})
  }
}

const updateDepartment = async (req, res) => {
  try{
    const {id} = req.params;
    const {dep_name, description} = req.body;
    const updateDep = await Department.findByIdAndUpdate({_id: id}, {
      dep_name,
      description
    })
    return res.status(200).json({success: true, updateDep})
  } catch(error) {
      return res.status(500).json({success: false, error: "Edit department server error"})
  }
  }

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if department exists
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ 
        success: false, 
        error: "Department not found" 
      });
    }

    // Check if there are any employees in this department
    const employeesInDepartment = await Employee.find({ department: id });
    if (employeesInDepartment.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Cannot delete department with existing employees. Please reassign or remove employees first." 
      });
    }

    // Delete the department
    const deletedDepartment = await Department.findByIdAndDelete(id);
    
    return res.status(200).json({
      success: true, 
      message: "Department deleted successfully",
      department: deletedDepartment
    });
  } catch (error) {
    console.error("Delete department error:", error);
    return res.status(500).json({
      success: false, 
      error: "Delete department server error"
    });
  }
}

export { addDepartment , getDepartments, getDepartment, updateDepartment, deleteDepartment};
