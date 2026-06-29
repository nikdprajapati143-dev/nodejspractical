import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types/user.types";
import { useAuthStore } from "../store/auth.store";

interface Props {
  role: UserRole;
}

export default function RoleRoute({ role }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
