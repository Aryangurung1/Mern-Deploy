/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye, Edit, DollarSign, FileText, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
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
        setShowDeleteModal(false);
        // Refresh the employee list
        if (onDelete) onDelete();
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || "Failed to delete employee";
      toast.error(errorMessage);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
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
          onClick={() => setShowDeleteModal(true)}
          title="Delete Employee"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Employee
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this employee? This action will also delete all associated records including leaves and work from home requests. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
