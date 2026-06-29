// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuthStore } from "../store/auth.store";

// interface Props {
//   children: React.ReactNode;
//   roles?: string[];
// }
// export default function ProtectedRoute({ children, roles }: Props) {
//   const token = useAuthStore((state) => state.token);
//   const user = useAuthStore((state) => state.user);

//   const location = useLocation();

//   console.log("Current Path:", location.pathname);
//   console.log("Token:", token);

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/tasks" replace />;
//   }

//   return <Outlet />;
// }

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children?: React.ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: Props) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const location = useLocation();

  console.log("Current Path:", location.pathname);
  console.log("Token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/tasks" replace />;
  }

  // If ProtectedRoute wraps a component directly
  if (children) {
    return <>{children}</>;
  }

  // If ProtectedRoute wraps nested routes
  return <Outlet />;
}
