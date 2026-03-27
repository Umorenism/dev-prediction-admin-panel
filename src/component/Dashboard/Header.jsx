// src/components/dashboard/Header.jsx
import { Bell } from "lucide-react";
import profilePic from "../../assets/profile.png";
export default function Header() {
  return (
    <header
      className="fixed top-0 left-72 right-0 z-40 
                 bg-[#F6E9EA] border-b border-[#E0C0C3] shadow-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="h-16 lg:h-20 px-6 lg:px-8 flex items-center justify-between">
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          
         <div className="w-10 h-10 rounded-full overflow-hidden">
  <img
    src={profilePic}
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>

          <div className="flex flex-col">
            <span className="font-semibold text-[#A61E30] text-[18px] leading-none">
              Sarah James
            </span>

            <span className="text-xs text-[#6B2C35] font-medium mt-1">
              Admin
            </span>
          </div>
        </div>

        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-[#E8D3D5] text-[#A61E30] relative"
          aria-label="Notifications"
        >
          <Bell size={22} />

          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#F6E9EA]" />
        </button>

      </div>
    </header>
  );
}