import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./../utils/Auth";

export default function PrivateRoute() {
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/" />;
}
