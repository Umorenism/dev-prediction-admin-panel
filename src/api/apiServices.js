




// apiServices.js
import axios from "axios";

const base_url = "https://sportpredict-1-tao8.onrender.com/";

// ------------------- GENERAL USER API -------------------
export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});



apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ SAME AS ADMIN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ------------------- ADMIN API -------------------
export const adminApi = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// Attach admin token automatically
// apiServices.js
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");          // ← change to "token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Admin Request] Adding token:", token.substring(0, 20) + "...");
    } else {
      console.warn("[Admin Request] No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------- AUTH -------------------

// Admin login
// apiServices.js
export const loginAdmin = async ({ email, password }) => {
  console.log("🔑 Sending login request:", { email });

  try {
    const res = await apiClient.post("/api/auth/login", { email, password });
    const { token, admin } = res.data;

    if (!token) throw new Error("No token received from server");

    localStorage.setItem("token", token);                    // consistent key
    localStorage.setItem("admin", JSON.stringify(admin));

    // Optional: set default header for both clients
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { user: admin, token };
  } catch (err) {
    console.error("❌ Login failed:", err.response?.data || err.message);
    throw err;
  }
};





// ------------------- USER & ADMIN MANAGEMENT -------------------

// Fetch all general users
export const getAllUsers = async () => {
  const res = await adminApi.get("/api/admin/users");
  return res.data; // Returns the array of user objects
};

// Admin CRUD operations
export const getAllAdmins = async () => {
  const res = await adminApi.get("/api/v1/admin/admins");
  return res.data.data;
};

export const createAdmin = async (adminData) => {
  const res = await adminApi.post("/api/v1/admin/admins", adminData);
  return res.data;
};

export const updateAdmin = async (id, updateData) => {
  const res = await adminApi.put(`/api/v1/admin/admins/${id}`, updateData);
  return res.data;
};

export const deleteAdmin = async (id) => {
  const res = await adminApi.delete(`/api/v1/admin/admins/${id}`);
  return res.data;
};

export const toggleAdminStatus = async (id) => {
  const res = await adminApi.patch(`/api/v1/admin/admins/${id}/toggle-status`);
  return res.data;
};



// ------------------- PAYMENT & SUBSCRIPTION -------------------

export const getPaymentPlans = async () => {
  const res = await apiClient.get("/api/payments/plans");
  return res.data;
};

export const subscribeToPlan = async (planId) => {
  const res = await apiClient.post("/api/payments/subscribe-to-plan", { plan: planId });
  return res.data;
};

export const getSubscriptionStatus = async () => {
  const res = await apiClient.get("/api/payments/status");
  return res.data;
};

export const checkPaymentDetails = async (paymentId) => {
  const res = await apiClient.get(`/api/payments/check-status/${paymentId}`);
  return res.data;
};

// ------------------- PREDICTIONS API -------------------

export const getAllPredictions = async () => {
  const res = await adminApi.get("/api/predictions");
  return res.data; // Assumes array of predictions
};

export const createPrediction = async (predictionData) => {
  const res = await adminApi.post("/api/predictions", predictionData);
  return res.data;
};

export const updatePrediction = async (id, updateData) => {
  const res = await adminApi.put(`/api/predictions/${id}`, updateData);
  return res.data;
};

export const getPredictionById = async (id) => {
  const res = await adminApi.get(`/api/predictions/${id}`);
  return res.data;
};




// ------------------- USER PROFILE API -------------------

export const getUserProfile = async () => {
  const res = await apiClient.get("/api/users/profile");
  return res.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await apiClient.put("/api/users/profile", profileData);
  return res.data;
};

export const deleteUserAccount = async () => {
  const res = await apiClient.delete("/api/users/account");
  return res.data;
};


// ------------------- OVERVIEW DATA AGGREGATION -------------------

export const getAdminOverviewStats = async () => {
  // Fetching all core data in parallel for the dashboard
  const [users, admins, predictions, plans] = await Promise.all([
    adminApi.get("/api/admin/users"),
    adminApi.get("/api/v1/admin/admins"),
    adminApi.get("/api/predictions"),
    apiClient.get("/api/payments/plans")
  ]);

  return {
    totalUsers: users.data.length,
    premiumUsers: users.data.filter(u => u.isPremium).length,
    totalStaff: admins.data.data.length,
    totalPredictions: predictions.data.length,
    availablePlans: plans.data.length,
    recentUsers: users.data.slice(-5).reverse(), // Last 5 signups
  };
};