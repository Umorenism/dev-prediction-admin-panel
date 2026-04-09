import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  CreditCard,
  Calendar,
  UserCheck,
  ShieldAlert,
} from "lucide-react";
import logo1 from "../../assets/logo.png";
import bglogo from "../../assets/sidimg.png";
import { IoPersonSharp } from "react-icons/io5";

const sidebarBg = bglogo;

const navItems = [
  { 
    to: "/dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    end: true // Important: only matches exactly /dashboard
  },
  { 
    to: "/dashboard/admin", // Fixed: added /dashboard prefix
    label: "Admin Management", 
    icon: ShieldAlert, // Changed icon for clarity
    end: true 
  },
  { 
    to: "/dashboard/users", 
    label: "User Profile", 
    icon: IoPersonSharp 
  },
  { 
    to: "/dashboard/payment", 
    label: "Payment Logic", 
    icon: CreditCard 
  },
  { 
    to: "/dashboard/predictions", 
    label: "Predictions Feed", 
    icon: Trophy 
  },
];

export default function Sidebar({ mobile = false }) {
  const navigate = useNavigate();

  const baseClasses = mobile
    ? "flex flex-col h-full p-6 relative overflow-hidden"
    : "flex flex-col h-screen p-6 relative overflow-hidden";

  return (
    <aside className={`${baseClasses}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sidebarBg})` }}
      >
        {/* Dark overlay with premium betting feel */}
        <div className="absolute inset-0 bg-[#0A0F1C]/85" />
      </div>

      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center items-center">
          {/* <img 
            src={logo1} 
            alt="Dev Prediction Logo" 
            className="h-40 w-40 object-contain" 
          /> */}
          DEV-PREDICTION
        </div>

        <hr className="mb-6 border-white/20" />

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-[14px] font-semibold backdrop-blur-[2px] ${
                  isActive
                    ? "bg-amber-400 text-[#0A0F1C] shadow-lg shadow-black/40"
                    : "text-white hover:bg-white/10 hover:text-amber-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-[10px] transition-colors ${
                    isActive 
                      ? "bg-[#0A0F1C] text-amber-400" 
                      : "bg-white/10 text-white"
                  }`}>
                    <item.icon 
                      size={20} 
                      strokeWidth={isActive ? 2.8 : 2} 
                    />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="pt-6 mt-auto border-t border-white/20 space-y-1">
          {/* <FooterButton
            icon={Settings}
            label="Settings"
            onClick={() => navigate("/dashboard/settings")}
          /> */}
          <FooterButton
            icon={LogOut}
            label="Logout"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </aside>
  );
}

function FooterButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3.5 px-4 py-3 w-full text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all text-[14px] font-semibold backdrop-blur-[2px]"
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}