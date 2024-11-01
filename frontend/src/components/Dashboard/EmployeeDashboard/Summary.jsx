import { User } from "lucide-react";
import { useAuth } from "../../../context/authContext";

const Summary = () => {
    const {user} = useAuth()
  return (
    <div className="p-6">
    <div className="roundedb flex bg-white">
      <div
        className={`text-3xl flex justify-center items-center bg-blue-400  text-white px-4`}
      >
        <User />
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">Welcome Back</p>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
    </div>
    </div>
  );
};

export default Summary;
