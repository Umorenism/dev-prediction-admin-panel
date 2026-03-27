import React, { useState } from "react";
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const DevPredictionAdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ────── Stats Data ──────
  const stats = [
    {
      title: "Total Users",
      value: "12,458",
      change: "↑8.2% this week",
      icon: Users,
      color: "text-emerald-600",
    },
    {
      title: "Active Predictions",
      value: "3,284",
      change: "↑14% today",
      icon: Trophy,
      color: "text-amber-600",
    },
    {
      title: "Total Stakes",
      value: "₦48.7M",
      change: "↑22% this week",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Winning Predictions",
      value: "1,892",
      change: "61.2% win rate",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Pending Results",
      value: "427",
      change: "Needs attention",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  // ────── Recent Predictions ──────
  const predictions = [
    {
      id: "#PRED-8921",
      user: "Ahmed Bello",
      match: "Manchester City vs Arsenal",
      prediction: "Man City Win",
      stake: "45,000",
      status: "Pending",
      date: "Mar 26, 2026",
    },
    {
      id: "#PRED-8920",
      user: "Chinaza Okeke",
      match: "Real Madrid vs Barcelona",
      prediction: "Over 2.5 Goals",
      stake: "28,500",
      status: "Won",
      date: "Mar 26, 2026",
    },
    {
      id: "#PRED-8919",
      user: "David Okafor",
      match: "Nigeria vs Ghana",
      prediction: "Draw",
      stake: "120,000",
      status: "Lost",
      date: "Mar 25, 2026",
    },
    {
      id: "#PRED-8918",
      user: "Fatima Yusuf",
      match: "PSG vs Bayern Munich",
      prediction: "PSG Win",
      stake: "67,000",
      status: "Pending",
      date: "Mar 25, 2026",
    },
  ];

  const totalPages = Math.ceil(predictions.length / itemsPerPage);
  const paginatedPredictions = predictions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ────── Chart Data ──────
  const chartData = [
    { day: "Mon", predictions: 420, stakes: 1240000 },
    { day: "Tue", predictions: 680, stakes: 2890000 },
    { day: "Wed", predictions: 540, stakes: 1670000 },
    { day: "Thu", predictions: 920, stakes: 4530000 },
    { day: "Fri", predictions: 1250, stakes: 6720000 },
    { day: "Sat", predictions: 1840, stakes: 12480000 },
    { day: "Sun", predictions: 1560, stakes: 8930000 },
  ];

  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6 md:p-8 text-gray-900">
      <div className="max-w-7xl mt-10 mx-auto space-y-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Dev Prediction Admin</h1>
          <p className="text-gray-500 mt-1">Platform overview • March 27, 2026</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-500/50 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-3 text-gray-900">{item.value}</h2>
                  <p className={`text-sm mt-2 font-medium ${item.color}`}>{item.change}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl">
                  <item.icon size={28} className={item.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-7 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <TrendingUp className="text-amber-600" /> Daily Activity
            </h3>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="predictions" fill="#EBDAA3" radius={[6, 6, 0, 0]} name="Predictions" />
                <Bar dataKey="stakes" fill="#22C55E" radius={[6, 6, 0, 0]} name="Stakes (₦)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Admin Actions */}
          <div className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Quick Admin Actions</h3>
            
            <div className="space-y-4 flex-1">
              <button 
                onClick={() => alert("Navigate to /admin/users")}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-amber-500 p-5 rounded-2xl text-left transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-amber-700">Manage Users</div>
                <div className="text-sm text-gray-500 mt-1">View, edit or suspend users</div>
              </button>

              <button 
                onClick={() => alert("Navigate to /admin/predictions")}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-amber-500 p-5 rounded-2xl text-left transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-amber-700">Update Prediction Status</div>
                <div className="text-sm text-gray-500 mt-1">Mark results as Won / Lost</div>
              </button>

              <button 
                onClick={() => alert("Navigate to /admin/transactions")}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-amber-500 p-5 rounded-2xl text-left transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-amber-700">View Transactions</div>
                <div className="text-sm text-gray-500 mt-1">All deposits & withdrawals</div>
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              API Base: <span className="text-amber-600 font-medium">/admin/</span>
            </div>
          </div>
        </div>

        {/* Recent Predictions Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Recent Predictions</h3>
            <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-2">
              View All Predictions →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">PREDICTION ID</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">USER</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">MATCH</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">PREDICTION</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">STAKE</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">STATUS</th>
                  <th className="text-left px-8 py-5 text-gray-600 font-medium">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPredictions.map((pred, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-mono text-amber-700 font-medium">{pred.id}</td>
                    <td className="px-8 py-5 font-medium text-gray-800">{pred.user}</td>
                    <td className="px-8 py-5 text-gray-700">{pred.match}</td>
                    <td className="px-8 py-5 font-medium">{pred.prediction}</td>
                    <td className="px-8 py-5 font-medium text-gray-800">₦{pred.stake}</td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                          pred.status === "Won"
                            ? "bg-emerald-100 text-emerald-700"
                            : pred.status === "Lost"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {pred.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-gray-600">{pred.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end px-8 py-6 border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <IoIosArrowBack /> Previous
              </button>

              <span className="font-medium px-4">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                Next <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};