import { Navigate, Outlet } from "react-router";
import { RootState } from "../main";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace={true} />;
}

export default ProtectedRoute;
