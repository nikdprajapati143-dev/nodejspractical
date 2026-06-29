import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-bold">Task Management</h1>

      <div>
        Welcome,
        <span className="ml-2 font-semibold">{user?.name}</span>
      </div>

      <button
        onClick={handleLogout}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}
