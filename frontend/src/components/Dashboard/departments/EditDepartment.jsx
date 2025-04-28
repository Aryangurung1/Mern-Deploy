import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, Building2, Loader } from "lucide-react"
import toast from "react-hot-toast"

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const baseURL = import.meta.env.VITE_EMPORA_LINK;
                if (!baseURL) {
                    throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
                }
                const response = await axios.get(`${baseURL}/api/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || "Failed to fetch department";
                toast.error(errorMessage);
                navigate("/admin-dashboard/departments");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchDepartment();
    }, [id, navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const baseURL = import.meta.env.VITE_EMPORA_LINK;
            if (!baseURL) {
                throw new Error("Environment variable VITE_EMPORA_LINK is not set.");
            }
            const response = await axios.put(`${baseURL}/api/department/${id}`, department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                toast.success("Department updated successfully");
                navigate("/admin-dashboard/departments")
            }
        } catch(error) {
            const errorMessage = error.response?.data?.error || "Failed to update department";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-teal-600" />
                <p className="mt-2 text-sm text-gray-600">Loading department details...</p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Department</h2>
                    <p className="mt-1 text-sm text-gray-600">Update department information</p>
                </div>
                <Link
                    to="/admin-dashboard/departments"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Departments</span>
                </Link>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                placeholder="Enter department name"
                                value={department.dep_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter department description"
                                value={department.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Building2 className="w-4 h-4" />
                                    <span>Update Department</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDepartment
