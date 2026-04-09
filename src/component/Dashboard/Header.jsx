import React, { useState, useEffect } from "react";
import { Bell, Loader2, UserCircle } from "lucide-react";
import { getUserProfile } from "../../api/apiServices";

export default function Header() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getUserProfile();
        setAdmin(data);
      } catch (err) {
        console.error("Header Profile Sync Error");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <header
      className="fixed top-0 left-72 right-0 z-40 
                 bg-white border-b border-slate-100 shadow-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="h-16 lg:h-20 px-8 flex items-center justify-between">
        
        {/* Dynamic Admin Info */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
            {loading ? (
              <Loader2 className="animate-spin text-[#3866A3]" size={18} />
            ) : admin?.name ? (
              <span className="font-black text-[#3866A3] text-lg uppercase">
                {admin.name.charAt(0)}
              </span>
            ) : (
              <UserCircle className="text-slate-300" size={24} />
            )}
          </div>

          <div className="flex flex-col">
            {loading ? (
              <div className="h-4 w-24 bg-slate-100 animate-pulse rounded mt-1" />
            ) : (
              <span className="font-black text-slate-800 text-[15px] leading-none uppercase tracking-tighter">
                {admin?.name || "Access Restricted"}
              </span>
            )}

            <span className="text-[10px] text-[#3866A3] font-black uppercase tracking-widest mt-1 italic">
              System {admin?.role || "Operator"}
            </span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-[#3866A3] transition-all relative group"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
          </button>
          
          <div className="h-8 w-[1px] bg-slate-100 mx-2" />
          
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Server Live</span>
          </div>
        </div>

      </div>
    </header>
  );
}