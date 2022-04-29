import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "./../utils/Auth";

export default function AdminRoute() {
  const auth = isAuthenticated();
  const { role } = userInfo();

  return auth && role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
