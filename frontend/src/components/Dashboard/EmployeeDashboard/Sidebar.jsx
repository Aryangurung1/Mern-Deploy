import { CircleDollarSign, ClipboardCheck, Gauge, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidebar = () => {
  const {user} = useAuth()
  return (
    <div className="bg-gray-200 text-black h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-300 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center">Empora</h3>
      </div>
      <div className="px-4 text-black">
        <NavLink to="/employee-dashboard" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Gauge />
        <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <User />
        <span>My profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/attendance/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-300" : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <ClipboardCheck />
          <span>Attendance</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/holidays`} className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Gauge />
        <span>Holidays</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Gauge />
        <span>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/wfh/${user._id}`} className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Gauge />
        <span>WFH</span>
        </NavLink>
        <NavLink to="/employee-dashboard/salary" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <CircleDollarSign />
        <span>Salary</span>
        </NavLink>
        <NavLink to="/employee-dashboard/setting" className={({isActive}) => `${isActive ? "bg-blue-300" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Settings />
        <span>Change Password</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
