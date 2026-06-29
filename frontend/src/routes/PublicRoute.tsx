// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "../store/auth.store";

// export default function PublicRoute() {
//   const token = useAuthStore((state) => state.token);

//   if (token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function PublicRoute() {
  const token = useAuthStore((state) => state.token);

  const user = useAuthStore((state) => state.user);

  if (token) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
