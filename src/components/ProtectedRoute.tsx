import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute = () => {
    const token = Cookies.get("authToken");
    console.log("protected route ki under token is: ", token);
    return token ? <Outlet /> : <Navigate to="/auth" replace={true} />;
}

export default ProtectedRoute;
