import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/Dashboard/AdminSidebar"
import Navbar from "../components/Dashboard/Navbar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
const AdminDashboard = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  if(user.role === "employee"){
    navigate("/employee-dashboard")
    return;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar/>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
