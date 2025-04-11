import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import DashboardLayout from "../components/layouts/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../components/layouts/Auth";
import Login from "../components/pages/AuthPage/Login";
import NotFound from "../components/pages/NotFound";
import LandingLayout from "../components/layouts/Landing";
import Home from "../components/pages/LandingPage/Home";
import Menu from "../components/pages/LandingPage/Menu";
import Reviews from "../components/pages/LandingPage/Reviews";
import CreateOrder from "../components/pages/DashboardPage/CreateOrder";
import OrdersPage from "../components/pages/DashboardPage/Orders";
import OrderDetailPage from "../components/pages/DashboardPage/OrderDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "create",
        element: <CreateOrder />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "orders/:id",
        element: <OrderDetailPage />,
      },
      {
        index: true,
        element: <Navigate to="/dashboard/create" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
