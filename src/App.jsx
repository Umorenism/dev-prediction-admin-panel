import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./component/Auth/Login";

import PredictionsManagement from "./pages/PredictionsManagement";
import Payment from "./pages/Payment";
import AdminManagement from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import AdminOverview from "./pages/AdminOverview";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Dashboard Wrapper 
          All children here will share the Sidebar and Header inside <Dashboard />
      */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* URL: /dashboard (The Stats Overview) */}
        <Route index element={<AdminOverview />} />

        {/* URL: /dashboard/admin */}
        <Route path="admin" element={<AdminManagement />} />
        
        {/* URL: /dashboard/predictions */}
        <Route path="predictions" element={<PredictionsManagement/>} />
        
        {/* URL: /dashboard/payment */}
        <Route path="payment" element={<Payment/>} />
        
        {/* URL: /dashboard/users */}
        <Route path="users" element={<UserProfile/>} />
      </Route>

      {/* Fallback: If no route matches, go to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}