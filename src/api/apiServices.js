




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

