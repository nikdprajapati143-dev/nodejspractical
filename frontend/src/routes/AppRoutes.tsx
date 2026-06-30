import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TaskList from "../pages/tasks/TaskList";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";
import CreateTask from "../pages/tasks/CreateTask";

import { UserRole } from "../types/user.types";
import EditTask from "../pages/tasks/EditTask";
import TaskDetails from "../pages/tasks/TaskDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/tasks" element={<TaskList />} />

            {/* <Route path="/tasks/create" element={<CreateTask />} />

            <Route path="/tasks/:id/edit" element={<EditTask />} /> */}
            <Route
              path="/tasks/create"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <CreateTask />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks/:id/edit"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EditTask />
                </ProtectedRoute>
              }
            />

            {/* View Task — accessible by both admin and user */}
            <Route path="/tasks/:id/view" element={<TaskDetails />} />

            {/* <Route element={<RoleRoute role={UserRole.ADMIN} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
