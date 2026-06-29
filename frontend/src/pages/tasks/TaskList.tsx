// import useTasks from "../../hooks/useTasks";
// import TaskTable from "../../components/tasks/TaskTable";
// import Loader from "../../components/common/Loader";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../../store/auth.store";

// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useQueryClient } from "@tanstack/react-query";
// import socket from "../../socket/socket";

// export default function TaskList() {
//   const { data, isLoading } = useTasks();
//   const user = useAuthStore((state) => state.user);
//   const isAdmin = user?.role === "admin";

//   if (isLoading) return <Loader />;

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const handleStatusUpdated = (data: any) => {
//       console.log("Socket Received :", data);

//       toast.success(data.message);

//       queryClient.invalidateQueries({
//         queryKey: ["tasks"],
//       });
//     };

//     socket.on(
//       "task-status-updated",

//       handleStatusUpdated,
//     );

//     return () => {
//       socket.off(
//         "task-status-updated",

//         handleStatusUpdated,
//       );
//     };
//   }, [queryClient]);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">
//             {isAdmin ? "Tasks" : "My Tasks"}
//           </h1>

//           <p className="mt-1 text-gray-500">
//             {isAdmin
//               ? "Manage and assign tasks to users"
//               : "View and update your assigned tasks"}
//           </p>
//         </div>

//         {isAdmin && (
//           <Link
//             to="/tasks/create"
//             className="rounded-lg bg-blue-600 px-5 py-3 text-white"
//           >
//             + Create Task
//           </Link>
//         )}
//       </div>

//       <div className="rounded-xl bg-white shadow border border-gray-200 overflow-hidden">
//         <TaskTable tasks={data?.data ?? []} isAdmin={isAdmin} />
//       </div>
//     </div>
//   );
// }

import useTasks from "../../hooks/useTasks";
import TaskTable from "../../components/tasks/TaskTable";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../socket/socket";

export default function TaskList() {
  const { data, isLoading } = useTasks();

  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.role === "admin";

  // ✅ Call all hooks before any return
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusUpdated = (data: any) => {
      console.log("Socket Received :", data);

      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    };

    socket.on("task-status-updated", handleStatusUpdated);

    return () => {
      socket.off("task-status-updated", handleStatusUpdated);
    };
  }, [queryClient]);

  // ✅ Return after all hooks
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isAdmin ? "Tasks" : "My Tasks"}
          </h1>

          <p className="mt-1 text-gray-500">
            {isAdmin
              ? "Manage and assign tasks to users"
              : "View and update your assigned tasks"}
          </p>
        </div>

        {isAdmin && (
          <Link
            to="/tasks/create"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            + Create Task
          </Link>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow overflow-hidden">
        <TaskTable tasks={data?.data ?? []} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
