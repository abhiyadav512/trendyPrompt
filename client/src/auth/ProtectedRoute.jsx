import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        const userRole = decoded.role;

        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="*" replace />;
        }

    } catch (err) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
