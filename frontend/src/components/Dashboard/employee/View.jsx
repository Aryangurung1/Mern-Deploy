/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

const InfoRow = ({ label, value }) => (
  <div className="flex border-b border-gray-100 py-3">
    <p className="text-sm font-semibold text-gray-600 w-40">{label}:</p>
    <p className="text-sm text-gray-900 capitalize">{value}</p>
  </div>
);

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const baseURL = import.meta.env.VITE_EMPORA_LINK;
        if (!baseURL) {
          throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
        }
        const response = await axios.get(`${baseURL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Failed to fetch employee details";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="text-sm text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">Employee not found</p>
          <Link 
            to="/admin-dashboard/employees"
            className="mt-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Details</h2>
            <p className="mt-1 text-sm text-gray-600">View detailed information about the employee</p>
          </div>
          <Link
            to="/admin-dashboard/employees"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Employees</span>
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Image */}
              <div className="flex flex-col justify-center min-h-[400px]">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group mt-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 ring-4 ring-offset-4 ring-teal-100 transition-all duration-300 group-hover:ring-teal-200">
                      {imageError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <UserIcon className="w-24 h-24 text-gray-400" />
                        </div>
                      ) : (
                        <img
                          src={`${import.meta.env.VITE_EMPORA_LINK}/${employee.userId.profileImage}`}
                          alt={employee.userId.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() => setImageError(true)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">{employee.userId.name}</h3>
                    <div className="mt-2 flex items-center gap-2 justify-center">
                      <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full">{employee.designation}</span>
                      <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">{employee.department.dep_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-4">PERSONAL INFORMATION</h4>
                <div className="space-y-1">
                  <InfoRow label="Employee ID" value={employee.employeeId} />
                  <InfoRow label="Department" value={employee.department.dep_name} />
                  <InfoRow 
                    label="Date of Birth" 
                    value={new Date(employee.dob).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                  />
                  <InfoRow label="Gender" value={employee.gender} />
                  <InfoRow label="Marital Status" value={employee.maritalStatus} />
                  <InfoRow label="Designation" value={employee.designation} />
                  <InfoRow 
                    label="Salary" 
                    value={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(employee.salary)} 
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-600 mb-1">Department</h4>
                  <p className="text-2xl font-bold text-blue-900">{employee.department.dep_name}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-600 mb-1">Role</h4>
                  <p className="text-2xl font-bold text-green-900">{employee.userId.roles?.join(', ') || 'Employee'}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-600 mb-1">Status</h4>
                  <p className="text-2xl font-bold text-purple-900">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
