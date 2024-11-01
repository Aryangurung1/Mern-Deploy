import { CircleDollarSign, Gauge, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="bg-slate-600 text-black h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-300 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center">Empora</h3>
      </div>
      <div className="px-4 text-white">
        <NavLink to="/employee-dashboard" className={({isActive}) => `${isActive ? "bg-slate-700" : " "} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
        <Gauge />
        <span>Dashboard</span>
        </NavLink>
        <NavLink to="/employee-dashboard/profile" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
        <User />
        <span>My profile</span>
        </NavLink>
        <NavLink to="/employee-dashboard/leaves" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
        <Gauge />
        <span>Leaves</span>
        </NavLink>
        <NavLink to="/employee-dashboard/salary" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
        <CircleDollarSign />
        <span>Salary</span>
        </NavLink>
        <NavLink to="/employee-dashboard/setting" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
        <Settings />
        <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
