import Loader from "@/components/shared/Loader";
import { useAuthContext } from "@/context/AuthProvider";
import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }
  if (accessToken) {
    return <main>{children}</main>;
  }

  return <Navigate to={"/login"} />;
};

export const HideAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, accessToken } = useAuthContext();

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );

  if (!accessToken) return <main>{children}</main>;

  return <Navigate to={"/"} />;
};
