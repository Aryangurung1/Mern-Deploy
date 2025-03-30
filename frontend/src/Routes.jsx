import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Dashboard/departments/DepartmentList";
import AddDepartment from "./components/Dashboard/departments/AddDepartment";
import EditDepartment from "./components/Dashboard/departments/EditDepartment";
import EmployeeList from "./components/Dashboard/employee/EmployeeList";
import AddEmployee from "./components/Dashboard/employee/AddEmployee";
import View from "./components/Dashboard/employee/View";
import EditEmployee from "./components/Dashboard/employee/EditEmployee";
import Summary from "./components/Dashboard/EmployeeDashboard/Summary";
import LeaveList from "./components/Dashboard/leaves/LeaveList";
import WfhList from "./components/Dashboard/wfh/WfhList";
import SalaryList from "./components/Dashboard/Salary/SalaryList";
import Setting from "./components/Dashboard/Setting/SettingList";
import List from "./components/Dashboard/leaves/List";
import ListWfh from "./components/Dashboard/wfh/List";
import AddLeave from "./components/Dashboard/leaves/Add";
import AddWfh from "./components/Dashboard/wfh/Add"
import Attendance from "./components/Dashboard/attendance/Attendance";
import EmployeeAttendance from "./components/Dashboard/employeeAttendace/employeeAttendance";
import LeaveDetail from "./components/Dashboard/leaves/LeaveDetail";
import WfhDetail from "./components/Dashboard/wfh/WfhDetail";
import NoticeList from "./components/notice/Notice";
import HolidayTable from "./components/Dashboard/Holidays/Holidays";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "hr", "accountant"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route 
          path="/admin-dashboard/leaves"
          element={<LeaveList />}
        ></Route>
        <Route 
          path="/admin-dashboard/leaves/:id"
          element={<LeaveDetail />}
        ></Route>
        <Route 
          path="/admin-dashboard/employees/leaves/:id"
          element={<List />}
        ></Route>
        <Route 
          path="/admin-dashboard/wfh"
          element={<WfhList />}
        ></Route>
        <Route 
          path="/admin-dashboard/wfh/:id"
          element={<WfhDetail />}
        ></Route>
        <Route 
          path="/admin-dashboard/employees/wfh/:id"
          element={<ListWfh />}
        ></Route>
        <Route
            path="/admin-dashboard/attendance"
            element={<Attendance />}
          ></Route>
        <Route
          path="/admin-dashboard/holidays"
          element={<HolidayTable />}
        ></Route>
        <Route path="/admin-dashboard/notice" element={<NoticeList />} />

        <Route
          path="/admin-dashboard/salary"
          element={<SalaryList />}
        ></Route>
        <Route
          path="/admin-dashboard/settings"
          element={<Setting />}
        ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<View />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/:id"
            element={<List />}
          ></Route>
          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/wfh/:id"
            element={<ListWfh />}
          ></Route>
          <Route
            path="/employee-dashboard/add-wfh"
            element={<AddWfh />}
          ></Route>
         <Route
            path="/employee-dashboard/attendance/:id"
            element={<EmployeeAttendance />}
          ></Route>
             <Route
            path="/employee-dashboard/holidays"
            element={<HolidayTable />}
          ></Route>
          <Route
            path="/employee-dashboard/salary"
            element={<SalaryList />}
          ></Route>
          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


