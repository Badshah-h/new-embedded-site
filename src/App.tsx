import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load admin components
const AdminLayout = lazy(() => import("./components/admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const UsersPage = lazy(() => import("./components/admin/users/UsersPage"));
const ConversationsPage = lazy(
  () => import("./components/admin/conversations/ConversationsPage"),
);
const AnalyticsPage = lazy(
  () => import("./components/admin/analytics/AnalyticsPage"),
);
const WidgetConfigPage = lazy(
  () => import("./components/admin/widget/WidgetConfigPage"),
);
const Login = lazy(() => import("./components/admin/auth/Login"));
const Register = lazy(() => import("./components/admin/auth/Register"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="widget-config" element={<WidgetConfigPage />} />
            {/* Add more admin routes as needed */}
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
