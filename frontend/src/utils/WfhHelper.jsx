/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Employee ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "150px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "70px",
    },
    {
        name: "Status",
        selector: (row) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                row.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : row.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
            }`}>
                {row.status}
            </span>
        ),
        width: "100px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    }
]

export const WfhButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/wfh/${Id}`);
    }

    return(
        <button
            className="p-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            onClick={handleView}
            title="View Details"
        >
            <Eye className="w-4 h-4" />
        </button>
    )
}