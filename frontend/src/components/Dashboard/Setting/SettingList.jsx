

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const SettingList = () => {
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          toast.success("Password changed successfully");
          setError(null);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        {['oldPassword', 'newPassword', 'confirmPassword'].map((field, index) => (
          <div key={index}>
            <label className="text-sm font-medium text-gray-700">
              {field === 'oldPassword' ? 'Old Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'}
            </label>
            <div className="mb-4 flex">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name={field}
                placeholder={field === 'oldPassword' ? 'Old Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md"
          onClick={handleToggle}
        >
          {isPasswordVisible ? "Hide Password" : "Show Password"}
        </button>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SettingList;
