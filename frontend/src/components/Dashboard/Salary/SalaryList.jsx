import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import DistributeSalaryModal from "./DistributeSalaryModal";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const navigate = useNavigate();

  // Check if we're in employee dashboard and get user context
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isEmployeeView = location.pathname.includes('employee-dashboard');
  const employeeIdParam = searchParams.get('employeeId');
  const isSpecificEmployeeView = !!employeeIdParam;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch salaries
  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
      }
      const response = await axios.get(`${baseURL}/api/salary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          search: !isSpecificEmployeeView ? searchTerm : undefined,
          month: selectedMonth,
          department: !isSpecificEmployeeView ? selectedDepartment : undefined,
          employeeId: employeeIdParam,
        },
      });
      
      // Filter salaries based on view type and parameters
      if (isEmployeeView) {
        const employeeSalaries = response.data.filter(salary => 
          salary.employeeId.userId._id === user._id
        );
        setSalaries(employeeSalaries);
      } else if (employeeIdParam) {
        const filteredSalaries = response.data.filter(salary => 
          salary.employeeId._id === employeeIdParam
        );
        setSalaries(filteredSalaries);
      } else {
        setSalaries(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching salaries");
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments for filter
  const fetchDepartments = async () => {
    if (isEmployeeView || isSpecificEmployeeView) return; // Don't fetch departments in employee view
    
    try {
      setLoadingDepartments(true);
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
      }
      const response = await axios.get(`${baseURL}/api/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setDepartments(response.data.departments);
      } else {
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments");
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [isEmployeeView, isSpecificEmployeeView]);

  useEffect(() => {
    fetchSalaries();
  }, [searchTerm, selectedMonth, selectedDepartment, isEmployeeView, employeeIdParam]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {isSpecificEmployeeView && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">Salary Management</h1>
        </div>
        {!isEmployeeView && (
          <button
            onClick={() => setShowDistributeModal(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4" />
            Distribute Salary
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className={`grid ${isSpecificEmployeeView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
          {!isSpecificEmployeeView && !isEmployeeView && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          {!isSpecificEmployeeView && !isEmployeeView && (
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              disabled={loadingDepartments}
            >
              <option value="">Select Department</option>
              {Array.isArray(departments) && departments.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.dep_name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">Loading...</td>
              </tr>
            ) : salaries.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">No salaries found</td>
              </tr>
            ) : (
              salaries.map((salary) => (
                <tr key={salary._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{salary.employeeId.userId.name}</td>
                  <td className="px-6 py-4">{salary.department.dep_name}</td>
                  <td className="px-6 py-4">{salary.month}</td>
                  <td className="px-6 py-4">{salary.year}</td>
                  <td className="px-6 py-4">Nrs. {salary.baseSalary}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>Leave: Nrs. {salary.deductions.leave.toFixed(2)}</div>
                      <div>Tax: Nrs. {salary.deductions.tax.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">Nrs. {salary.netSalary.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Distribute Salary Modal */}
      {showDistributeModal && (
        <DistributeSalaryModal
          departments={departments}
          onClose={() => setShowDistributeModal(false)}
          onDistribute={() => {
            fetchSalaries();
            setShowDistributeModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SalaryList;
