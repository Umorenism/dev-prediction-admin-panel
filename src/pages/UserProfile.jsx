import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Shield, Crown, 
  Save, Trash2, Calendar, Loader2, CheckCircle2 
} from "lucide-react";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../api/apiServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [metadata, setMetadata] = useState(null); // For non-editable data like role/premium

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || "",
      });
      setMetadata(data);
    } catch (err) {
      toast.error("Could not load profile settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(profile);
      toast.success("Profile synchronized successfully");
    } catch (err) {
      toast.error("Update failed. Please check your data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("WARNING: This will permanently delete your account and all subscriptions. Continue?")) {
      try {
        await deleteUserAccount();
        toast.success("Account deleted");
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        toast.error("Security clearance failed. Try again later.");
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="animate-spin text-[#3866A3]" size={32} />
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-10 mt-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Account Settings</h1>
        <p className="text-slate-500 font-medium">Manage your personal credentials and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Information Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <User size={16} className="text-[#3866A3]" /> Profile Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                  <input 
                    name="name" 
                    value={profile.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 text-sm font-bold focus:border-[#3866A3] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                  <input 
                    name="email" 
                    type="email"
                    value={profile.email} 
                    onChange={handleInputChange} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 text-sm font-bold focus:border-[#3866A3] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                  <input 
                    name="phoneNumber" 
                    value={profile.phoneNumber} 
                    onChange={handleInputChange} 
                    placeholder="+1 234 567 890"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 text-sm font-bold focus:border-[#3866A3] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="mt-10 flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-[#3866A3] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? "Syncing..." : "Update Credentials"}
            </button>
          </form>
        </div>

        {/* Right Column: Status & Danger Zone */}
        <div className="space-y-6">
          
          {/* Membership Card */}
          <div className="bg-[#3866A3] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                  <Shield size={24} />
                </div>
                {metadata?.isPremium && (
                  <span className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    <Crown size={12} /> Premium
                  </span>
                )}
              </div>
              
              <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Platform Role</p>
              <h3 className="text-xl font-black uppercase mb-6 tracking-tighter">{metadata?.role}</h3>

              <div className="flex items-center gap-2 py-3 px-4 bg-white/10 rounded-2xl border border-white/10">
                <Calendar size={16} className="text-blue-100" />
                <div className="text-left">
                  <p className="text-[9px] font-black text-blue-100/50 uppercase">Subscription Ends</p>
                  <p className="text-xs font-black">
                    {metadata?.subscriptionExpiresAt ? new Date(metadata.subscriptionExpiresAt).toLocaleDateString() : 'Lifetime'}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Danger Zone */}
          <div className="bg-rose-50 rounded-[2.5rem] p-8 border border-rose-100">
            <h4 className="text-rose-600 font-black text-[10px] uppercase tracking-widest mb-2">Danger Zone</h4>
            <p className="text-[11px] font-medium text-rose-500/70 mb-6 leading-relaxed">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button 
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm shadow-rose-100"
            >
              <Trash2 size={16} />
              Terminte Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}