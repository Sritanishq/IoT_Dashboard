import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PermissionPage from "./pages/PermissionPage";
import DashboardPage from "./pages/DashboardPage";
import RolePage from "./pages/RolePage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import Login from "./components/LoginForm";
import UserDashboard from "./pages/NormalUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/user/dashboard" element={<UserDashboard/>} />

        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/dashboard/users" element={<UserPage />} />
        <Route path="/admin/dashboard/roles" element={<RolePage />} />
        <Route path="/admin/dashboard/permissions" element={<PermissionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
