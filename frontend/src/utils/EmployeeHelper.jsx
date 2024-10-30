/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name ",
    selector: (row) => row.name,
    width: "130px"
    // sortable: true
  },
  {
    name: "Image ",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department ",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "120px",
     sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
];

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button className="px-3 py-1 bg-blue-500 text-white" onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>Edit</button>
      <button className="px-3 py-1 bg-yellow-500 text-white">Salary</button>
      <button className="px-3 py-1 bg-red-500 text-white">Leave</button>
    </div>
  );
};
