import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, adminOnly = false }) => {
    const user = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    const location = useLocation();

    // Redirect to login if there is no logged in user
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If adminOnly is true and userRole is not 'admin', redirect to home or another designated page
    if (adminOnly && !userRole.includes('ROLE_ADMIN')) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
