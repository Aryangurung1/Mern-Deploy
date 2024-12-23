// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import PrivateRoutes from "./utils/PrivateRoutes";
// import RoleBaseRoutes from "./utils/RoleBaseRoutes";
// import AdminSummary from "./components/Dashboard/AdminSummary";
// import DepartmentList from "./components/Dashboard/departments/DepartmentList";
// import AddDepartment from "./components/Dashboard/departments/AddDepartment";
// import EditDepartment from "./components/Dashboard/departments/EditDepartment";
// import EmployeeList from "./components/Dashboard/employee/EmployeeList";
// import AddEmployee from "./components/Dashboard/employee/AddEmployee";
// import View from "./components/Dashboard/employee/View";
// import EditEmployee from "./components/Dashboard/employee/EditEmployee";
// import Summary from "./components/Dashboard/EmployeeDashboard/Summary";
// import LeaveList from "./components/Dashboard/leaves/LeaveList";
// import WfhList from "./components/Dashboard/wfh/WfhList";
// import EventList from "./components/Dashboard/Events/EventList";
// import SalaryList from "./components/Dashboard/Salary/SalaryList";
// import SettingList from "./components/Dashboard/Setting/SettingList";
// import List from "./components/Dashboard/leaves/List";
// import AddLeave from "./components/Dashboard/leaves/Add";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route
//           path="/admin-dashboard"
//           element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={"admin"}>
//                 <AdminDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }
//         >
//           <Route index element={<AdminSummary />}></Route>
//           <Route
//             path="/admin-dashboard/departments"
//             element={<DepartmentList />}
//           ></Route>
//           <Route 
//           path="/admin-dashboard/leaves"
//           element={<LeaveList />}
//         ></Route>
//         <Route
//           path="/admin-dashboard/wfh"
//           element={<WfhList />}
//         ></Route>
//         <Route
//           path="/admin-dashboard/events"
//           element={<EventList />}
//         ></Route>
//         <Route
//           path="/admin-dashboard/salary"
//           element={<SalaryList />}
//         ></Route>
//         <Route
//           path="/admin-dashboard/settings"
//           element={<SettingList />}
//         ></Route>
//           <Route
//             path="/admin-dashboard/add-department"
//             element={<AddDepartment />}
//           ></Route>
//           <Route
//             path="/admin-dashboard/department/:id"
//             element={<EditDepartment />}
//           ></Route>
//           <Route
//             path="/admin-dashboard/employees"
//             element={<EmployeeList />}
//           ></Route>
//           <Route
//             path="/admin-dashboard/add-employee"
//             element={<AddEmployee />}
//           ></Route>
//           <Route
//             path="/admin-dashboard/employees/:id"
//             element={<View />}
//           ></Route>
//           <Route
//             path="/admin-dashboard/employees/edit/:id"
//             element={<EditEmployee />}
//           ></Route>
//         </Route>
//         <Route
//           path="/employee-dashboard"
//           element={
//             <PrivateRoutes>
//               <RoleBaseRoutes requiredRole={["admin", "employee"]}>
//                 <EmployeeDashboard />
//               </RoleBaseRoutes>
//             </PrivateRoutes>
//           }
//         >
//           <Route index element={<Summary />}></Route>
//           <Route
//             path="/employee-dashboard/profile/:id"
//             element={<View />}
//           ></Route>
//           <Route
//             path="/employee-dashboard/leaves"
//             element={<List />}
//           ></Route>
//           <Route
//             path="/employee-dashboard/add-leave"
//             element={<AddLeave />}
//           ></Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import AppRoutes from "./Routes"

const App = () => {
  return (
    <AppRoutes />
  )
}

export default App
