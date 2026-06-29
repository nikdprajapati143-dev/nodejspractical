import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../types/user.types";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="border-b p-6 text-xl font-bold">MERN</div>

      <nav className="space-y-2 p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded p-3 ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `block rounded p-3 ${isActive ? "bg-slate-700" : "hover:bg-slate-700"}`
          }
        >
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
}
