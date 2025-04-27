import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

const DistributeSalaryModal = ({ departments, onClose, onDistribute }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch employees when department is selected
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!selectedDepartment) {
        setEmployees([]);
        return;
      }

      try {
        setLoadingEmployees(true);
        const baseURL = import.meta.env.VITE_EMPORA_LINK;
        if (!baseURL) {
          throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
        }
        const response = await axios.get(`${baseURL}/api/employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.data.success) {
          // Filter employees by selected department
          const departmentEmployees = response.data.employees.filter(
            emp => emp.department._id === selectedDepartment
          ).map(emp => ({
            _id: emp._id,
            name: emp.userId.name
          }));
          setEmployees(departmentEmployees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees");
        setEmployees([]);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, [selectedDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDepartment || !selectedEmployee || !month) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
      }
      await axios.post(
        `${baseURL}/api/salary/distribute`,
        {
          employeeId: selectedEmployee,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Salary distributed successfully");
      onDistribute();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to distribute salary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Distribute Salary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.dep_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                required
                disabled={!selectedDepartment || loadingEmployees}
              >
                <option value="">
                  {loadingEmployees 
                    ? "Loading employees..." 
                    : selectedDepartment 
                      ? "Select Employee" 
                      : "Select a department first"
                  }
                </option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || loadingEmployees}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Distribute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributeSalaryModal; 