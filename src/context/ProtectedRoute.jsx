import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // 1. Handle Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-[#3866A3]" size={40} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verifying Credentials...</p>
      </div>
    );
  }

  // 2. Check for Token and User existence
  const token = localStorage.getItem("token");
  
  if (!user || !token) {
    console.warn("[ProtectedRoute] No session found. Redirecting...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Strict Admin Check 
  // This ensures a standard user cannot access the /dashboard paths
  if (!isAdmin) {
    console.error("[ProtectedRoute] Access Denied: User is not an admin.");
    return <Navigate to="/login" replace />;
  }

  return children;
}