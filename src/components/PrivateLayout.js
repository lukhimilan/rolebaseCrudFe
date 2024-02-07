import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";

 const PrivateLayout = () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return <Navigate to="/login" />;
  return (
    <>
      {authToken && (
        <>
          <div>
            <Header />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};
export default PrivateLayout;