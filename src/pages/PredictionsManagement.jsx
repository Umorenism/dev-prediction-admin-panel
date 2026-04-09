import React, { useState, useEffect } from "react";
import { 
  Plus, Edit3, Trash2, Crown, Globe, Clock, 
  Search, Loader2, X, CheckCircle2, Trophy
} from "lucide-react";
import { getAllPredictions, createPrediction } from "../api/apiServices";
import toast from "react-hot-toast";

const AdminPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State matching your POST endpoint
  const [formData, setFormData] = useState({
    homeTeam: "",
    awayTeam: "",
    league: "",
    prediction: "",
    odds: "",
    confidence: "",
    isPremium: false,
    sport: "Football",
    startTime: ""
  });

  const fetchData = async () => {
    try {
      const data = await getAllPredictions();
      setPredictions(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load predictions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Convert numeric fields
      const payload = {
        ...formData,
        odds: parseFloat(formData.odds),
        confidence: parseInt(formData.confidence)
      };
      
      await createPrediction(payload);
      toast.success("Tip Published Successfully!");
      setIsModalOpen(false);
      setFormData({ homeTeam: "", awayTeam: "", league: "", prediction: "", odds: "", confidence: "", isPremium: false, sport: "Football", startTime: "" });
      fetchData(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPredictions = Array.isArray(predictions) ? predictions.filter(p => 
    p.homeTeam?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.awayTeam?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="p-8 bg-slate-50 min-h-screen relative">
      {/* Header */}
      <div className="mb-10 mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Prediction Lab</h1>
          <p className="text-slate-500 font-medium">Deploy real-time analysis to the platform.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#3866A3] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
        >
          <Plus size={18} />
          Post New Tip
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-5 top-4 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Filter by teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-100 rounded-[1.5rem] py-4 pl-14 text-sm font-bold shadow-sm outline-none focus:border-[#3866A3]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
           <div className="col-span-full py-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-[#3866A3]" size={32} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Prediction Database...</p>
           </div>
        ) : filteredPredictions.map((tip) => (
          <div key={tip._id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
             {/* ... Card UI remains same as previous ... */}
             <div className="flex justify-between items-center mb-6">
               <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-lg text-slate-500 uppercase tracking-widest">{tip.sport}</span>
               {tip.isPremium && <Crown size={18} className="text-amber-500" />}
             </div>
             <div className="flex justify-around items-center font-black text-slate-800 text-lg uppercase tracking-tighter">
                <span>{tip.homeTeam}</span>
                <span className="text-slate-200 italic text-xs">VS</span>
                <span>{tip.awayTeam}</span>
             </div>
             <div className="mt-6 flex gap-2">
                <div className="flex-1 bg-slate-50 p-3 rounded-xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Odds</p>
                  <p className="font-black text-[#3866A3]">@{tip.odds}</p>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Pick</p>
                  <p className="font-black text-slate-800 uppercase">{tip.prediction}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* POST NEW TIP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#3866A3] p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">New Prediction</h2>
                <p className="text-blue-100/70 text-[10px] font-bold uppercase tracking-widest mt-1">Add to global feed</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-5">
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Home Team</label>
                <input required name="homeTeam" value={formData.homeTeam} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="e.g. Real Madrid" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Away Team</label>
                <input required name="awayTeam" value={formData.awayTeam} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="e.g. Barcelona" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">League</label>
                <input required name="league" value={formData.league} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="La Liga" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Sport</label>
                <select name="sport" value={formData.sport} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]">
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Prediction Pick</label>
                <input required name="prediction" value={formData.prediction} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="e.g. Home Win or Over 2.5" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Odds</label>
                <input required step="0.01" type="number" name="odds" value={formData.odds} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="1.85" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Confidence (%)</label>
                <input required type="number" name="confidence" value={formData.confidence} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" placeholder="85" />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Start Time</label>
                <input required type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#3866A3]" />
              </div>

              <div className="col-span-2 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleInputChange} className="w-5 h-5 accent-[#3866A3]" id="isPremium" />
                <label htmlFor="isPremium" className="text-xs font-black text-slate-700 uppercase cursor-pointer flex items-center gap-2">
                  Mark as Premium <Crown size={14} className="text-amber-500" />
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="col-span-2 py-4 bg-[#3866A3] text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                {isSubmitting ? "Uploading..." : "Publish Prediction"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPredictions;