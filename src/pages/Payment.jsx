import React, { useState, useEffect } from "react";
import { 
  CreditCard, CheckCircle, Clock, AlertCircle, 
  ExternalLink, Zap, ShieldCheck, DollarSign 
} from "lucide-react";
import { getPaymentPlans, getSubscriptionStatus } from "../api/apiServices";
import toast from "react-hot-toast";

export default function Payment() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const [plansData, statusData] = await Promise.all([
          getPaymentPlans(),
          getSubscriptionStatus()
        ]);
        setPlans(plansData);
        setStatus(statusData);
      } catch (err) {
        toast.error("Error fetching payment data");
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentData();
  }, []);

  if (loading) return <div className="p-10 text-slate-400 font-bold animate-pulse">SYNCING LEDGER...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-10 mt-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Subscription Engine</h1>
        <p className="text-slate-500 font-medium italic">Manage billing tiers and monitor premium access.</p>
      </div>

      {/* Global Status Banner */}
      <div className={`mb-10 p-6 rounded-[2rem] border flex items-center justify-between ${status?.isPremium ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${status?.isPremium ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-800 uppercase text-sm">System Access Level</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {status?.isPremium ? `Active: ${status.plan} Plan` : 'Standard Access'}
            </p>
          </div>
        </div>
        {status?.isPremium && (
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase">Expires At</p>
            <p className="text-sm font-black text-slate-800">{new Date(status.expiresAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plan Configurator */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Available Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Zap className="text-[#3866A3]" size={28} />
                    <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full uppercase text-slate-500">
                      {plan.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#3866A3]">${plan.price}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">{plan.currency}</span>
                  </div>
                  <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#3866A3] transition-all">
                    Configure Tier
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Health / Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Verification</h2>
          <div className="bg-[#3866A3] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-tight">Audit Check</h3>
            </div>
            <p className="text-xs text-blue-100/70 mb-6 leading-relaxed">
              Verify manual transaction IDs or check the status of a specific blockchain/gateway payment.
            </p>
            <div className="space-y-2">
               <input 
                type="text" 
                placeholder="TXID-000000"
                className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-xs font-bold placeholder-white/30 outline-none focus:bg-white/20 transition-all"
               />
               <button className="w-full py-3 bg-white text-[#3866A3] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">
                 Verify Status
               </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} />
            </div>
            <h4 className="text-xs font-black text-slate-800 uppercase">Webhook Active</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-1">Listening for api/payments/webhook</p>
          </div>
        </div>
      </div>
    </div>
  );
}