import { NavLink } from "react-router-dom";
import {
  Banknote,
  Building2,
  CalendarDays,
  CalendarX,
  Gauge,
  HousePlug,
  Settings2,
  Users,
  Bell,
  Loader2
} from 'lucide-react'
import { useAuth } from "../../context/authContext";

const AdminSidebar = () => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white border-r border-gray-200 fixed left-0 top-0 h-screen w-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // Ensure user and roles exist
  const userRoles = user?.roles || [];

  return (
    <div className="bg-white border-r border-gray-200 fixed left-0 top-0 h-screen w-64">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Empora
        </h3>
      </div>

      <div className="p-3 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
        <NavLink 
          to="/admin-dashboard" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <Gauge className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        
        {!userRoles.includes("accountant") && (
          <>
            <NavLink 
              to="/admin-dashboard/employees" 
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Employees</span>
            </NavLink>

            <NavLink 
              to="/admin-dashboard/departments" 
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Departments</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/attendance"
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CalendarDays className="w-5 h-5" />
              <span>Attendance</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/notice"
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notices</span>
            </NavLink>

            <NavLink 
              to="/admin-dashboard/wfh" 
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HousePlug className="w-5 h-5" />
              <span>WFH</span>
            </NavLink>

            <NavLink 
              to="/admin-dashboard/holidays" 
              className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CalendarX className="w-5 h-5" />
              <span>Holidays</span>
            </NavLink>
          </>
        )}

        <NavLink 
          to="/admin-dashboard/leaves" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          <span>Leave</span>
        </NavLink>

        {!userRoles.includes("hr") && (
          <NavLink 
            to="/admin-dashboard/salary" 
            className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Banknote className="w-5 h-5" />
            <span>Salary</span>
          </NavLink>
        )}

        <NavLink 
          to="/admin-dashboard/settings" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Settings2 className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
