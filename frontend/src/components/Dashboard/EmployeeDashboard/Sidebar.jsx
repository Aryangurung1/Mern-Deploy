import { 
  CalendarX, 
  CircleDollarSign, 
  ClipboardCheck, 
  Gauge, 
  Settings, 
  User,
  CalendarDays,
  Home
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidebar = () => {
  const {user} = useAuth();

  return (
    <div className="bg-white border-r border-gray-200 fixed left-0 top-0 h-screen w-64">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Empora
        </h3>
      </div>

      <div className="p-3 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
        <NavLink 
          to="/employee-dashboard" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <Gauge className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`} 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <User className="w-5 h-5" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/attendance/${user._id}`}
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <ClipboardCheck className="w-5 h-5" />
          <span>Attendance</span>
        </NavLink>

        <NavLink 
          to={`/employee-dashboard/holidays`} 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <CalendarX className="w-5 h-5" />
          <span>Holidays</span>
        </NavLink>

        <NavLink 
          to={`/employee-dashboard/leaves/${user._id}`} 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <CalendarDays className="w-5 h-5" />
          <span>Leaves</span>
        </NavLink>

        <NavLink 
          to={`/employee-dashboard/wfh/${user._id}`} 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <Home className="w-5 h-5" />
          <span>WFH</span>
        </NavLink>

        <NavLink 
          to="/employee-dashboard/salary" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <CircleDollarSign className="w-5 h-5" />
          <span>Salary</span>
        </NavLink>

        <NavLink 
          to="/employee-dashboard/setting" 
          className={({isActive}) => `flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          end
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
