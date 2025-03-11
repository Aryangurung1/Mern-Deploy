import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const baseURL = import.meta.env.VITE_EMPORA_LINK;

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/notice`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setNotices(response.data.notices);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // Add new notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/notice/add`, newNotice, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setNotices([...notices, response.data.notice]);
        setNewNotice({ title: "", content: "" });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  // Delete notice
  const handleDeleteNotice = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/api/notice/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setNotices(notices.filter((notice) => notice._id !== id));
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notices</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> {showAddForm ? "Hide Form" : "Add Notice"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddNotice} className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newNotice.title}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              value={newNotice.content}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Notice
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {notices.length === 0 ? (
          <p className="text-gray-500 text-center">No notices available.</p>
        ) : (
          notices.map((notice) => (
            <li
              key={notice._id}
              className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                <p className="text-gray-600">{notice.content}</p>
              </div>
              <button
                onClick={() => handleDeleteNotice(notice._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notice;