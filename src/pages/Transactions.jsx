import React, { useState, useEffect } from "react";
import { adminApi } from "../api/apiServices"; // Make sure this path is correct
import { 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast"; // Optional but recommended

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Log token for debugging (remove in production)
      const token = localStorage.getItem("token");
      console.log("🔑 Token being sent:", token ? token.substring(0, 30) + "..." : "NO TOKEN");

      const response = await adminApi.get("/api/admin/transactions");
      
      console.log("✅ Transactions fetched:", response.data);
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("❌ Fetch transactions error:", err.response?.data || err.message);
      
      const errorMsg = err.response?.data?.message || err.message || "Failed to load transactions";
      
      if (err.response?.status === 401 || errorMsg.toLowerCase().includes("token")) {
        setError("Invalid or expired token. Please log in again.");
        // Optional: auto logout
        // localStorage.removeItem("token");
        // window.location.href = "/login";
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      completed: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      failed: "bg-red-100 text-red-700",
    };

    const icons = {
      completed: <CheckCircle size={16} />,
      pending: <Clock size={16} />,
      failed: <XCircle size={16} />,
    };

    const displayStatus = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
        {icons[status] || null}
        {displayStatus}
      </div>
    );
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#F8F9FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex mt-10 flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-500 mt-1">All deposits, withdrawals and plan payments</p>
          </div>
          <button 
            onClick={fetchTransactions}
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-white border border-gray-300 rounded-2xl text-black hover:bg-gray-50 flex items-center gap-2 text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8 text-center">
            {error}
            <button 
              onClick={fetchTransactions}
              className="mt-4 block mx-auto px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Transactions</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{transactions.length}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-4xl font-bold text-emerald-600 mt-2">
              {formatNaira(transactions.reduce((sum, t) => sum + (t.amount || 0), 0))}
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-4xl font-bold text-amber-600 mt-2">
              {transactions.filter(t => t.status?.toLowerCase() === "pending").length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">TRANSACTION ID</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">USER ID</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">PLAN</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">AMOUNT</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">STATUS</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5 font-mono text-gray-700 font-medium">
                        {tx.chargeId ? tx.chargeId.substring(0, 12) + "..." : tx._id?.substring(0, 12) + "..."}
                      </td>
                      <td className="px-8 py-5 text-gray-700 font-medium">{tx.userId}</td>
                      <td className="px-8 py-5">
                        <span className="capitalize px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {tx.plan || "N/A"}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-semibold text-emerald-700">
                        {formatNaira(tx.amount)}
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-8 py-5 text-gray-600">
                        {tx.createdAt ? format(new Date(tx.createdAt), "dd MMM yyyy • hh:mm a") : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-8 py-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length}
              </p>
              <div className="flex items-center gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-5 py-2 rounded-2xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-5 py-2 rounded-2xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;