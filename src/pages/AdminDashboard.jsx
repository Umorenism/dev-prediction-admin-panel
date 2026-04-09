import React, { useState, useEffect } from "react";
import { 
  Users, Shield, UserPlus, Trash2, 
  RefreshCw, CheckCircle, XCircle, MoreVertical 
} from "lucide-react";
import { 
  getAllUsers, getAllAdmins, toggleAdminStatus, deleteAdmin 
} from "../api/apiServices";
import toast from "react-hot-toast";

const AdminManagement = () => {
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'admins'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "users") {
        const users = await getAllUsers();
        setData(users);
      } else {
        const admins = await getAllAdmins();
        setData(admins);
      }
    } catch (err) {
      toast.error("Failed to sync management data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleToggle = async (id) => {
    try {
      await toggleAdminStatus(id);
      toast.success("Status updated");
      fetchData();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-10 mt-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Access Control</h1>
          <p className="text-slate-500 font-medium">Manage platform users and administrative staff.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-[#3866A3] text-white shadow-lg' : 'text-slate-400'}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab("admins")}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'admins' ? 'bg-[#3866A3] text-white shadow-lg' : 'text-slate-400'}`}
          >
            Staff
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role/Plan</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                  Loading Secure Data...
                </td>
              </tr>
            ) : data.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-[#3866A3]">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{item.name}</p>
                      <p className="text-[11px] font-medium text-slate-400">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${item.isPremium || item.role === 'admin' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                    {activeTab === 'users' ? (item.isPremium ? 'Premium' : 'Free') : item.role}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {item.isActive ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <XCircle size={14} className="text-slate-300" />
                    )}
                    <span className={`text-[11px] font-black uppercase ${item.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                      {item.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    {activeTab === 'admins' && (
                      <button 
                        onClick={() => handleToggle(item._id)}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-[#3866A3]"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                    <button className="p-2 hover:bg-rose-50 rounded-lg text-slate-300 hover:text-rose-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagement;