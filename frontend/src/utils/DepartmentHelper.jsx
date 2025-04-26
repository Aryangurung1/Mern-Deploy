/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
        width: "100px"
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
        grow: 2
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "150px"
    }
]

export const DepartmentButtons = ({Id, onDepartmentDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this department?")  
        if(confirm) {
            try {
                const baseURL = import.meta.env.VITE_EMPORA_LINK;
                if (!baseURL) {
                    throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
                }
                
                const response = await axios.delete(`${baseURL}/api/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if (response.data.success) {
                    toast.success("Department deleted successfully");
                    onDepartmentDelete()
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || "Failed to delete department";
                toast.error(errorMessage);
            }
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                title="Edit Department"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button 
                onClick={() => handleDelete(Id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete Department"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}