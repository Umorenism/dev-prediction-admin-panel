import React, { useState, useEffect } from "react";
import { adminApi } from "../api/apiServices"; // Adjust the import path as needed
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast"; // npm install react-hot-toast (recommended)

export default function Settings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSetting, setNewSetting] = useState({ key: "", value: "", description: "" });

  // Fetch all settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/api/admin/settings");
      setSettings(res.data || []);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Save or Update a setting
  const saveSetting = async (setting) => {
    try {
      setSaving(true);
      await adminApi.put("/api/admin/settings", {
        key: setting.key,
        value: setting.value,
        description: setting.description || "",
      });

      toast.success(`Setting "${setting.key}" saved successfully`);
      fetchSettings(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save setting");
    } finally {
      setSaving(false);
    }
  };

  // Add new setting
  const handleAddNew = () => {
    if (!newSetting.key || !newSetting.value) {
      toast.error("Key and Value are required");
      return;
    }
    saveSetting(newSetting);
    setNewSetting({ key: "", value: "", description: "" });
  };

  // Update existing setting value
  const updateSettingValue = (id, newValue) => {
    setSettings(prev =>
      prev.map(item =>
        item._id === id ? { ...item, value: newValue } : item
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4efe6] p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4efe6] p-8 font-dm">
      {/* Header */}
      <div className="mb-10 mt-10 flex justify-between items-center">
        <h1 className="text-[32px] font-semibold text-gray-900">Platform Settings</h1>
        <button
          onClick={fetchSettings}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Refresh
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Add New Setting */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Plus size={22} className="text-black" /> <span className="text-gray-900">Add New Setting</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key (unique)</label>
              <input
                type="text"
                value={newSetting.key}
                onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                placeholder="e.g. max_stake"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
              <input
                type="text"
                value={newSetting.value}
                onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                placeholder="e.g. 500000"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={newSetting.description}
                onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                placeholder="Maximum stake per prediction"
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            onClick={handleAddNew}
            disabled={saving}
            className="mt-6 bg-gray-900 hover:bg-amber-700 text-white px-8 py-3 rounded-2xl text-sm font-medium flex items-center gap-2 disabled:opacity-70"
          >
            <Save size={18} className="text-white"/> Add Setting
          </button>
        </div>

        {/* Existing Settings */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Current Settings</h2>

          {settings.length === 0 ? (
            <p className="text-gray-500 py-10 text-center text-gray-900">No settings found yet.</p>
          ) : (
            <div className="space-y-6">
              {settings.map((setting) => (
                <div
                  key={setting._id}
                  className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50 p-6 rounded-2xl border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-amber-700 font-medium">{setting.key}</div>
                    <p className="text-sm text-gray-500 mt-1">{setting.description || "No description"}</p>
                  </div>

                  <div className="flex-1 md:flex-none w-full md:w-80">
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => updateSettingValue(setting._id, e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>

                  <button
                    onClick={() => saveSetting(setting)}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-medium disabled:opacity-70 flex items-center gap-2 whitespace-nowrap"
                  >
                    <Save size={16} /> Save
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Section (kept from your original) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-xl">
          <h2 className="text-xl text-gray-900 font-semibold mb-3">Security</h2>
          <p className="text-gray-600 mb-6">
            Manage admin access and password
          </p>
          <button className="border border-gray-400 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-2xl text-sm font-medium">
            Change Admin Password
          </button>
        </div>
      </div>
    </div>
  );
}