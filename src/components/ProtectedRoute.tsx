import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
    const token = Cookies.get("authToken");
    console.log("protected route ki under token is: ", token);
    return token ? <Outlet /> : <Navigate to="/auth" replace={true} />;
}

export default ProtectedRoute;
