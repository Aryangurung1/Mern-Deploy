// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"


// const View = () => {
//     const {id} = useParams()
//     const [employee, setEmployee] = useState(null)

//     useEffect(() => {
//         const fetchEmployee = async () => {
//           try {
//             const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
//                 headers: {
//                   "Authorization" : `Bearer ${localStorage.getItem("token")}`,
//                 }
//               })
//             if (response.data.success) {
//                 setEmployee(response.data.employee)
//             }
//           } catch (error) {
//             if (error.response && !error.response.data.success) {
//               alert(error.response.data.error);
//             }
//           }
//         };
    
//         fetchEmployee();
//       }, []);
//   return (
//     <>{employee ? (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//         <h2 className="text-2xl font-bold mb-8 text-center">
//             Employee Details
//         </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//         <img src={`http://localhost:3000/${employee.userId.profileImage}`} alt="User Image" className=" w-72" />
//         </div>
//         <div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Name:</p>
//                 <p className="font-medium">{employee.userId.name}</p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Employee ID:</p>
//                 <p className="font-medium">{employee.employeeId}</p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Date  of Birth:</p>
//                 <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Gender:</p>
//                 <p className="font-medium">{employee.gender}</p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Department:</p>
//                 <p className="font-medium">{employee.department.dep_name}</p>
//             </div>
//             <div className="flex space-x-3 mb-5">
//                 <p className="text-lg font-bold">Marital Status:</p>
//                 <p className="font-medium">{employee.maritalStatus}</p>
//             </div>
//         </div>
//       </div>
//     </div>
//     ): <div>Loading...</div>}</>
//   )
// }

// export default View

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Employee Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Employee Image */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:3000/${employee.userId.profileImage}`}
            alt="User"
            className="w-72 h-72 object-cover  shadow-md"
          />
        </div>

        {/* Employee Info */}
        <div className="space-y-5">
          <div className="flex">
            <p className="text-lg font-bold w-40">Name:</p>
            <p className="font-medium">{employee.userId.name}</p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-40">Employee ID:</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-40">Date of Birth:</p>
            <p className="font-medium">
              {new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-40">Gender:</p>
            <p className="font-medium capitalize">{employee.gender}</p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-40">Department:</p>
            <p className="font-medium">{employee.department.dep_name}</p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-40">Marital Status:</p>
            <p className="font-medium capitalize">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
