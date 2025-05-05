import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute = () => {
    const userId = Cookies.get("userId");

    // const user = useSelector((state: RootState) => state.auth.user);

    // console.log("user?.userId", user?.userId);
    console.log("protected route ki under userid is: ", userId);
    return userId ? <Outlet /> : <Navigate to="/auth" replace={true} />;
}

export default ProtectedRoute;
