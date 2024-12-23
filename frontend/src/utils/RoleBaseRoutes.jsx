/* eslint-disable react/prop-types */
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  if(user.role === 'employee'){
    if (
        !requiredRole[0].includes(user.role)
      ) {
        <Navigate to="/unauthorized" />;
        return;
      }
  }else{
    if (
        !requiredRole[0].includes(user.role) ||
        !requiredRole[1].includes(user.role) ||
        !requiredRole[2].includes(user.role)
      ) {
        <Navigate to="/unauthorized" />;
      }
  }




  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
