import axios from "axios";
import { useEffect, useState } from "react";
import { columns, WfhButtons } from "../../../utils/WfhHelper";
import DataTable from "react-data-table-component";

const WfhList = () => {
  const [wfhs, setWfhs] = useState(null);
  const [filteredWfhs, setFilteredWfhs] = useState(null);

  const fetchWfhs = async () => {
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK; 
      if (!baseURL) {
        console.error("Environment variable REACT_APP_EMPORA_LINK is not set.");
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/wfh`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.wfhs.map((wfh) => ({
          _id: wfh._id,
          sno: sno++,
          employeeId: wfh.employeeId.employeeId,
          name: wfh.employeeId.userId.name,
          department: wfh.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(wfh.endDate) - new Date(wfh.startDate)) /
              (1000 * 60 * 60 * 24)
          ),
          status: wfh.status,
          action: <WfhButtons Id={wfh._id} />,
        }));
        setWfhs(data);
        setFilteredWfhs(data);
      }
    } catch (error) {
      console.error("Error fetching wfhs:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchWfhs();
  }, []);

  console.log(filteredWfhs);

  const filterByInput = (e) => {
    const data = wfhs.filter((wfh) =>
      wfh.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredWfhs(data);
  };

  const filterByButton = (status) => {
    const data = wfhs.filter((wfh) =>
      wfh.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredWfhs(data);
  };



  return (
    <>
      {filteredWfhs ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Wfhs</h3>
          </div>
          <div className="flex justify-between items-center pb-3">
            <input
              type="text"
              placeholder="Search By Employee Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3 text-white">
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700" onClick={() => filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700" onClick={() => filterByButton("Approved")}>
                Approved
              </button>
              <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700" onClick={() => filterByButton("Rejected")}>
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable columns={columns} data={filteredWfhs} pagination />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default WfhList;
