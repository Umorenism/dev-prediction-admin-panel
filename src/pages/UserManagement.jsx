import React, { useState, useEffect } from "react";
import { adminApi } from "../api/apiServices";
import { 
  Users, 
  UserCheck, 
  Shield, 
  Calendar, 
  Edit3 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      isPremium: user.isPremium || false,
      subscriptionPlan: user.subscriptionPlan || "free",
      isActive: user.isActive || true,
    });
  };

  // Update user
  const updateUser = async () => {
    if (!selectedUser) return;

    try {
      setUpdatingId(selectedUser._id);

      await adminApi.put(`/api/admin/users/${selectedUser._id}`, editForm);

      // Update local state
      setUsers(prev =>
        prev.map(user =>
          user._id === selectedUser._id ? { ...user, ...editForm } : user
        )
      );

      toast.success("User updated successfully");
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update user");
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle active status quickly
  const toggleActive = async (user) => {
    try {
      setUpdatingId(user._id);
      const newStatus = !user.isActive;

      await adminApi.put(`/api/admin/users/${user._id}`, { isActive: newStatus });

      setUsers(prev =>
        prev.map(u => u._id === user._id ? { ...u, isActive: newStatus } : u)
      );

      toast.success(`User ${newStatus ? "activated" : "deactivated"}`);
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const StatusBadge = ({ isActive }) => (
    <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
      isActive 
        ? "bg-emerald-100 text-emerald-700" 
        : "bg-red-100 text-red-700"
    }`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );

  const PremiumBadge = ({ isPremium }) => (
    isPremium ? (
      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full flex items-center gap-1">
        <Shield size={14} /> Premium
      </span>
    ) : null
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="text-amber-600" /> User Management
            </h1>
            <p className="text-gray-500 mt-1">Manage users, subscriptions and access</p>
          </div>
          <button
            onClick={fetchUsers}
            className="px-5 py-2.5 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 text-sm font-medium"
          >
            Refresh Users
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{users.length}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Premium Users</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {users.filter(u => u.isPremium).length}
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Active Users</p>
            <p className="text-4xl font-bold text-emerald-600 mt-2">
              {users.filter(u => u.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <p className="text-gray-500 text-sm">Free Users</p>
            <p className="text-4xl font-bold text-gray-600 mt-2">
              {users.filter(u => u.subscriptionPlan === "free").length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">USER</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">CONTACT</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">PLAN</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">PREMIUM</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">STATUS</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">JOINED</th>
                  <th className="text-left px-8 py-5 font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{user._id}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div>{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phoneNumber}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="capitalize px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {user.subscriptionPlan}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <PremiumBadge isPremium={user.isPremium} />
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge isActive={user.isActive} />
                    </td>
                    <td className="px-8 py-5 text-gray-600 text-sm">
                      {format(new Date(user.createdAt), "dd MMM yyyy")}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleActive(user)}
                          disabled={updatingId === user._id}
                          className={`px-4 py-2 rounded-2xl text-xs font-medium transition ${
                            user.isActive 
                              ? "bg-red-100 text-red-700 hover:bg-red-200" 
                              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          }`}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          onClick={() => openEditModal(user)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-medium flex items-center gap-2 transition"
                        >
                          <Edit3 size={15} /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-6">Edit User</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
                  <select
                    value={editForm.subscriptionPlan}
                    onChange={(e) => setEditForm({ ...editForm, subscriptionPlan: e.target.value })}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
                  >
                    <option value="free">Free</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium Access</label>
                  <div className="flex items-center gap-3 mt-3">
                    <input
                      type="checkbox"
                      checked={editForm.isPremium}
                      onChange={(e) => setEditForm({ ...editForm, isPremium: e.target.checked })}
                      className="w-5 h-5 accent-amber-600"
                    />
                    <span className="text-gray-700">Make user Premium</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <span className="text-gray-700">Account is Active</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                disabled={updatingId}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-medium rounded-2xl transition"
              >
                {updatingId ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;