import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable VITE_EMPORA_LINK is not set.");
        return;
      }
      const response = await axios.post(`${baseURL}/api/department/add`, department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Add Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Department Name</label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter department name"
            value={department.dep_name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            placeholder="Enter department description"
            value={department.description}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
