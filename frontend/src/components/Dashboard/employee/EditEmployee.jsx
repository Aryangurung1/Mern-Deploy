import { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const FormField = ({ label, children, required }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-900">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

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
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Failed to fetch employee";
        toast.error(errorMessage);
      } finally {
        setIsFetching(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
      }
      const response = await axios.put(
        `${baseURL}/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Employee updated successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update employee";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>
            <p className="mt-1 text-sm text-gray-600">Update employee information</p>
          </div>
          <Link
            to="/admin-dashboard/employees"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Employees</span>
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Personal Information</h3>
                <FormField label="Name" required>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </FormField>

                <FormField label="Marital Status" required>
                  <select
                    name="maritalStatus"
                    value={employee.maritalStatus}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </FormField>
              </div>

              {/* Employment Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Employment Information</h3>
                <FormField label="Designation" required>
                  <input
                    type="text"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </FormField>

                <FormField label="Department" required>
                  <select
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                    required
                  >
                    <option value="">Select department</option>
                    {departments?.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Salary" required>
                  <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                    required
                  />
                </FormField>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Updating Employee...</span>
                  </>
                ) : (
                  <span>Update Employee</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
