import React, { useState, useEffect } from "react";
import { 
  Users, Trophy, CreditCard, ShieldAlert, 
  ArrowUpRight, Activity, Zap, Crown, 
  TrendingUp, Loader2, AlertCircle 
} from "lucide-react";
import { getAdminOverviewStats } from "../api/apiServices";

const StatBox = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-slate-800`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="flex items-center gap-1 text-green-500 font-black text-[10px] uppercase tracking-tighter">
        <TrendingUp size={12} /> {trend}
      </div>
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
      {/* Optional chaining used here to prevent null errors */}
      <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tighter">{value ?? 0}</h3>
    </div>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
  </div>
);

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminOverviewStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Overview Sync Error:", err);
        setError("Failed to synchronize with the intelligence server.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 1. Loading Guard: Show this until 'stats' is actually populated
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="animate-spin text-[#3866A3]" size={40} />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Syncing Intelligence...</p>
    </div>
  );

  // 2. Error Guard: Show this if the API fails (401/500/Network error)
  if (error || !stats) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center">
      <AlertCircle className="text-rose-500" size={48} />
      <h2 className="text-xl font-black text-slate-800 uppercase italic">Connection Fragmented</h2>
      <p className="text-slate-500 max-w-sm">{error || "Please verify your admin credentials and network status."}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-8 py-3 bg-[#3866A3] text-white rounded-xl font-black text-xs uppercase tracking-widest"
      >
        Retry Handshake
      </button>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-10 mt-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">System Intelligence</h1>
          <p className="text-slate-500 font-medium">Real-time performance metrics for CherryHills.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-slate-500">Live Gateway</span>
        </div>
      </div>

      {/* Primary Stats - Accessing via stats? ensures no crash */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatBox title="Total Users" value={stats?.totalUsers} icon={Users} trend="+12%" color="bg-blue-500" />
        <StatBox title="Active Tips" value={stats?.totalPredictions} icon={Trophy} trend="+5%" color="bg-amber-500" />
        <StatBox title="Premium Subs" value={stats?.premiumUsers} icon={Crown} trend="+8%" color="bg-indigo-500" />
        <StatBox title="Staff Count" value={stats?.totalStaff} icon={ShieldAlert} trend="Stable" color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <Activity size={18} className="text-[#3866A3]" /> Recent Inbound
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Safe mapping using array fallback */}
            {(stats?.recentUsers || []).map((user) => (
              <div key={user._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#3866A3] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#3866A3] shadow-sm uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{user?.name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg ${user?.isPremium ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-500'}`}>
                    {user?.isPremium ? 'Premium' : 'Free'}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-[#3866A3] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#3866A3] rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <Zap size={32} className="mb-4 text-blue-200" />
              <h3 className="text-xl font-black uppercase tracking-tight">Rapid Actions</h3>
              <p className="text-blue-100/60 text-[10px] font-bold uppercase mt-1 mb-8">Bypass navigation</p>
              
              <div className="space-y-3">
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                  Post Live Tip
                </button>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                  Audit Payments
                </button>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-center">
            <CreditCard size={24} className="mx-auto text-slate-300 mb-4" />
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tiers</h4>
            <p className="text-2xl font-black text-slate-800 mt-1">{stats?.availablePlans || 0} Plans</p>
            <p className="text-[9px] font-bold text-green-500 uppercase mt-2">Gateways Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}