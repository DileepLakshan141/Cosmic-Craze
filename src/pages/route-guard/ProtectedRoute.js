import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { token } = useSelector((state) => state.user);
  return token ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default ProtectedRoute;
