import React, { useState, useEffect } from "react";
import { adminApi } from "../api/apiServices";
import { 
  Trophy, 
  AlertTriangle 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const PredictionsManagement = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Fetch all predictions
  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Debug: Check token before request
      const token = localStorage.getItem("token");
      console.log("🔑 Token for predictions request:", token ? token.substring(0, 30) + "..." : "❌ NO TOKEN FOUND");

      const res = await adminApi.get("/api/admin/predictions");
      
      console.log("✅ Predictions fetched successfully:", res.data?.length || 0, "items");
      setPredictions(Array.isArray(res.data) ? res.data : []);
      
    } catch (err) {
      console.error("❌ Fetch predictions failed:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.message || err.message || "Failed to load predictions";

      if (err.response?.status === 401 || errorMessage.toLowerCase().includes("token") || errorMessage.toLowerCase().includes("unauthorized")) {
        setError("Invalid or expired token. Please log out and log in again.");
      } else {
        setError(errorMessage);
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  // Update prediction status
  const updateStatus = async () => {
    if (!selectedPrediction || !newStatus) return;

    try {
      setUpdatingId(selectedPrediction._id);
      
      await adminApi.put(`/api/admin/predictions/${selectedPrediction._id}/status`, {
        status: newStatus
      });

      setPredictions(prev =>
        prev.map(p =>
          p._id === selectedPrediction._id ? { ...p, status: newStatus } : p
        )
      );

      toast.success(`Prediction updated to ${newStatus}`);
      setSelectedPrediction(null);
      setNewStatus("");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const openUpdateModal = (prediction) => {
    setSelectedPrediction(prediction);
    setNewStatus(prediction.status || "pending");
  };

  const StatusBadge = ({ status }) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5";
    
    switch (status?.toLowerCase()) {
      case "won":
        return <span className={`${base} bg-emerald-100 text-emerald-700`}>✅ Won</span>;
      case "lost":
        return <span className={`${base} bg-red-100 text-red-700`}>❌ Lost</span>;
      case "cancelled":
        return <span className={`${base} bg-gray-100 text-gray-700`}>Cancelled</span>;
      default:
        return <span className={`${base} bg-amber-100 text-amber-700`}>⏳ Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px] bg-[#F8F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex mt-10 justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Trophy className="text-amber-600" /> Predictions Management
            </h1>
            <p className="text-gray-500 mt-1">Update match results and prediction status</p>
          </div>
          <button
            onClick={fetchPredictions}
            className="px-5 py-2.5 bg-white border text-black border-gray-300 rounded-2xl hover:bg-gray-50 text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-3xl mb-10 text-center">
            <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
            <p className="font-medium text-lg">{error}</p>
            <button 
              onClick={fetchPredictions}
              className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition"
            >
              Retry
            </button>
            <p className="text-xs text-red-600 mt-4">
              Tip: Try logging out and logging in again if the token is invalid.
            </p>
          </div>
        )}

        {/* Table */}
        {!error && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">MATCH</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">LEAGUE / SPORT</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">PREDICTION</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">ODDS</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">CONFIDENCE</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">PREMIUM</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">STATUS</th>
                    <th className="text-left px-8 py-5 font-medium text-gray-600">START TIME</th>
                    <th className="w-32"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {predictions.length > 0 ? (
                    predictions.map((pred) => (
                      <tr key={pred._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="font-medium text-gray-900">
                            {pred.homeTeam} <span className="text-gray-400">vs</span> {pred.awayTeam}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-gray-700">
                          {pred.league} • {pred.sport}
                        </td>
                        <td className="px-8 py-5 font-medium">{pred.prediction}</td>
                        <td className="px-8 py-5 font-semibold text-emerald-600">@{pred.odds}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-500 rounded-full" 
                                style={{ width: `${Math.min(pred.confidence || 0, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600">
                              {pred.confidence || 0}%
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          {pred.isPremium ? (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">PREMIUM</span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <StatusBadge status={pred.status} />
                        </td>
                        <td className="px-8 py-5 text-gray-600 text-sm">
                          {pred.startTime ? format(new Date(pred.startTime), "dd MMM yyyy • HH:mm") : "—"}
                        </td>
                        <td className="px-8 py-5">
                          <button
                            onClick={() => openUpdateModal(pred)}
                            disabled={updatingId === pred._id}
                            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-2xl transition"
                          >
                            {updatingId === pred._id ? "Updating..." : "Update Status"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-8 py-20 text-center text-gray-500">
                        No predictions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {selectedPrediction && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-6">Update Prediction Status</h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Match</p>
              <p className="font-medium">
                {selectedPrediction.homeTeam} vs {selectedPrediction.awayTeam}
              </p>
              <p className="text-sm text-gray-600 mt-1">{selectedPrediction.prediction}</p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
              >
                <option value="pending">Pending</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedPrediction(null);
                  setNewStatus("");
                }}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                disabled={!newStatus || updatingId}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-medium rounded-2xl transition"
              >
                {updatingId ? "Updating..." : "Confirm Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionsManagement;