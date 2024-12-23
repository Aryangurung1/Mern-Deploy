/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

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
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px",
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
        selector: (row) => row.status,
        width: "100px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    }
]

export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${Id}`)
    }

    return(
        <button
            className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
            onClick={() => handleView(Id)}
        >View</button>
    )
}