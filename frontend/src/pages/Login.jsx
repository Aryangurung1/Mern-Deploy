import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        console.log("role", response.data.user.role);
        if (response.data.user.role === "admin" || response.data.user.role === "hr" || response.data.user.role === "accountant") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "Server Error");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative md:w-1/3 max-w-sm p-6 border-2 border-blue-600 rounded-lg"
        >
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-2 text-blue-600 font-bold">
            Log In
          </span>
          {error && <p className="text-red-400">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-1"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <label htmlFor="password">Password</label>
            <div className="mb-4 flex">
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-1"
                type={type}
                name="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="flex justify-around items-center"
                onClick={handleToggle}
              >
                <Icon class="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>
          <div className="text-center ">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
