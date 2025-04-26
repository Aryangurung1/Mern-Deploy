import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Building2, Loader } from "lucide-react";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#F3F4F6",
      fontSize: "14px",
      fontWeight: "bold",
      borderTopWidth: "1px",
      borderTopColor: "#E5E7EB",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#F9FAFB",
      },
      "&:hover": {
        backgroundColor: "#F3F4F6",
        cursor: "pointer",
      },
    },
  },
  pagination: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader className="w-8 h-8 animate-spin text-teal-600" />
    <p className="mt-2 text-gray-600">Loading departments...</p>
  </div>
);

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartment] = useState([])

  const onDepartmentDelete = () => {
    fetchDepartments()
  }

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable REACT_APP_EMPORA_LINK is not set.");
        return;
      }
      const response = await axios.get(`${baseURL}/api/department`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>,
        }));
        setDepartments(data)
        setFilteredDepartment(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredDepartment(records)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
            <p className="text-gray-600 mt-1">View and manage your organization&apos;s departments</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments by name..."
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                onChange={filterDepartments}
              />
            </div>
            <Link
              to="/admin-dashboard/add-department"
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
            >
              <Building2 className="w-5 h-5" />
              <span>Add New Department</span>
            </Link>
          </div>

          <div className="mt-6 border rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              progressPending={depLoading}
              progressComponent={<LoadingSpinner />}
              customStyles={customStyles}
              striped
              highlightOnHover
              responsive
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
