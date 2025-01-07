import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";


const WfhList = () => {
  // const [wfh, setWfh] = useState(null);
  let sno = 1;
  // const { id } = useParams();
  const {user} = useAuth()
  return (
    <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Work from home History</h3>
          </div>
          <div className="flex justify-between items-center pb-3">
            {user.role === "employee" &&  (
            <Link
              to="/employee-dashboard/add-leave"
              className="px-4 py-1 bg-blue-500 rounded text-white"
            >
              Add New WFH
            </Link>)}
          </div>
    
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="test-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* {wfh.map((leave) => (
                <tr
                  key={wfh._id}
                  className="bg-white border-b "
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{wfh.status}</td>

                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
  )
}

export default WfhList
