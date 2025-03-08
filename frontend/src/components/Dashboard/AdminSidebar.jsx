import { NavLink } from "react-router-dom";
import {Banknote, Building2, CalendarDays, Gauge, HousePlug, Settings2, Users} from 'lucide-react'
import { useAuth } from "../../context/authContext";
const AdminSidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-200 text-black h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-300 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center">Empora</h3>
      </div>
      <div className="px-4">
        <NavLink to="/admin-dashboard" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
          <Gauge />
          <span>Dashboard</span>
        </NavLink>
        
        {
          (!user.roles.includes("accountant")) && (
            <>
             <NavLink to="/admin-dashboard/employees" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <Users />
          <span>Employees</span>
        </NavLink>
             <NavLink to="/admin-dashboard/departments" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <Building2 />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/attendance"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-300" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <CalendarDays />
          <span>Attendance</span>
        </NavLink>
            <NavLink to="/admin-dashboard/wfh" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <HousePlug/>
          <span>WFH</span>
        </NavLink>
            <NavLink to="/admin-dashboard/events" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <CalendarDays/>
            <span>Events & Holidays</span>
          </NavLink>
            </>
            
          )
        }
          <NavLink to="/admin-dashboard/leaves" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <CalendarDays/>
          <span>Leave</span>
        </NavLink>

        {(!user.roles.includes("hr")) && (
          <NavLink to="/admin-dashboard/salary" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <Banknote/>
          <span>Salary</span>
        </NavLink>
        )}
      
        <NavLink to="/admin-dashboard/settings" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <Settings2/>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
