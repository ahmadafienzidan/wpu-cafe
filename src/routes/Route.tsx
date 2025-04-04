import { RouteObject } from "react-router-dom";

import DashboardLayout from "../components/layouts/Dashboard";
import ProtectedRoute from "./ProtectecRoute";
import AuthLayout from "../components/layouts/Auth";
import Login from "../components/pages/Login";

import NotFound from "../components/pages/NotFound";

const routes: RouteObject[] = [
  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
