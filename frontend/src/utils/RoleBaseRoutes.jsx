/* eslint-disable react/prop-types */
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Ensure roles is always an array
  const userRoles = user.roles || [user.role] || [];
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Special handling for HR and accountant - they can access both dashboards
  if (userRoles.some(role => ["hr", "accountant"].includes(role))) {
    const isAdminRoute = window.location.pathname.includes('admin-dashboard');
    const isEmployeeRoute = window.location.pathname.includes('employee-dashboard');
    
    // Allow access to both dashboards
    if (isAdminRoute || isEmployeeRoute) {
      return children;
    }
  }

  // For other roles, check if they have any of the required roles
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleBaseRoutes;
