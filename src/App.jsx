import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./component/Dashboard/ProtectedRoute";
import Login from "./component/Auth/Login";

// Pages


import OrderPage from "./pages/OrderPage";

import Management from "./pages/Management";

import OrderDetailInfo from "./detailinfo/OrderDetailInfo";
import CustomerslInfo from "./detailinfo/CustomersInfo";
import Settings from "./pages/Settings";
import Notifications from "./pages/Settings";
import AnalyticsPage from "./pages/AnalyticDashboard";
import CustomerPage from "./pages/CustomerPage";
import AdminPermission from "./pages/AdminPermission";
import ForgetPassword from "./component/Auth/Forget";
import { DevPredictionAdminDashboard } from "./pages/AdminDashboard";
import Transactions from "./pages/Transactions";
import PredictionsManagement from "./pages/PredictionsManagement";
import UserManagement from "./pages/UserManagement";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
       <Route path="forget-password" element={<ForgetPassword />} />
      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
          <Dashboard />
        //  </ProtectedRoute>
        }
      >
        <Route index element={<DevPredictionAdminDashboard/>} />
        {/* <Route path="orders" element={<OrderPage />} /> */}
        {/* <Route path="customers" element={<CustomerPage/>} />
        <Route path="menu" element={<Management/>} /> */}
        <Route path="analytics" element={<AnalyticsPage/>} />
        {/* <Route path="order/:id" element={<OrderDetailInfo />} /> */}
        {/* <Route path="customers/:id" element={<CustomerslInfo />} /> */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin" element={<AdminPermission />} />
        <Route path="transactions" element={<Transactions/>} />
        <Route path="predictions" element={<PredictionsManagement/>} />
        <Route path="users" element={<UserManagement/>} />
       
      </Route>

      {/* Catch all → redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
