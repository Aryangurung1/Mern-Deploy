/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye, Edit, DollarSign, FileText } from "lucide-react";
import toast from "react-hot-toast";

export const fetchDepartments = async () => {
  let departments;
  try {
    const baseURL = import.meta.env.VITE_EMPORA_LINK;
    const response = await axios.get(`${baseURL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return departments;
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "130px",
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "120px",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const EmployeeButtons = ({ Id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const baseURL = import.meta.env.VITE_EMPORA_LINK;
        if (!baseURL) {
          throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
        }
        const response = await axios.delete(`${baseURL}/api/employee/${Id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          toast.success("Employee deleted successfully");
          // Refresh the employee list
          if (onDelete) onDelete();
        }
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || "Failed to delete employee";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
        title="Edit Employee"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button 
        className="p-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        title="Salary Details"
      >
        <DollarSign className="w-4 h-4" />
      </button>
      <button
        className="p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
        title="Leave Management"
      >
        <FileText className="w-4 h-4" />
      </button>
      <button
        className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        onClick={handleDelete}
        title="Delete Employee"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
