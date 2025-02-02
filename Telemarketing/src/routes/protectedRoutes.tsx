import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

interface IProps {
  redirectTo: string;
}

export default function ProtectedRoutes({ redirectTo }: IProps) {
  const { handleGetToken } = useAuth();

  return handleGetToken() ? <Outlet /> : <Navigate to={redirectTo} />;
}
