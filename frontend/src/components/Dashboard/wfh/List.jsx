import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";

const List = () => {
  const [wfhs, setWfhs] = useState(null);
  let sno = 1;
  const { id } = useParams();
  const {user} = useAuth()

  const fetchWfhs = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable REACT_APP_EMPORA_LINK is not set.");
        return;
      }
      const response = await axios.get(
        `${baseURL}/api/wfh/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setWfhs(response.data.wfhs);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchWfhs();
  }, []);

  if(!wfhs) return <div>Loading...</div>
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Wfh History</h3>
      </div>
      <div className="flex justify-between items-center pb-3">
        {user.roles.includes("employee") && (
        <Link
          to="/employee-dashboard/add-wfh"
          className="px-4 py-1 bg-blue-500 rounded text-white"
        >
          Add New Wfh
        </Link>)}
      </div>

      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="test-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {wfhs.map((wfh) => (
            <tr
              key={wfh._id}
              className="bg-white border-b "
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">
                {new Date(wfh.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(wfh.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{wfh.reason}</td>
              <td className="px-6 py-3">{wfh.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
