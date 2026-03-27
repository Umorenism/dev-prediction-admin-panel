// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import { LayoutDashboard, ShieldCheck } from "lucide-react";

// export default function DevPredictionLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setLoading(false);
//       return setError("Please enter your admin credentials");
//     }

//     try {
//       // API call simulation
//       await new Promise((res) => setTimeout(res, 1200));
//       localStorage.setItem("admin_token", "dev_pred_secure_token");
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError("Invalid credentials or unauthorized access");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden font-sans">
      
//       {/* Background Tech Orbs/Glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

//       <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-0 bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 z-10 mx-4">
        
//         {/* Left Side: Branding & Info */}
//         <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative">
//           <div className="z-10">
//              <h1 className="text-2xl font-black tracking-tighter italic">DEVPREDICTION</h1>
//              <p className="text-indigo-100 mt-2 font-medium opacity-80 uppercase text-xs tracking-widest">Admin Control Center</p>
//           </div>

//           <div className="z-10">
//             <ShieldCheck size={48} className="mb-4 text-indigo-200" />
//             <h2 className="text-3xl font-bold leading-tight">Secure Management <br/> for Professional Sports Data.</h2>
//             <p className="mt-4 text-indigo-100 opacity-70">Monitor real-time predictions, manage VIP users, and audit platform transactions.</p>
//           </div>

//           {/* Abstract Grid Pattern Overlay */}
//           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="p-8 md:p-16 bg-[#1e293b]">
//           <div className="max-w-[360px] mx-auto">
//             <div className="mb-10 text-center md:text-left">
//               <h3 className="text-3xl font-extrabold text-white">Welcome Back</h3>
//               <p className="text-gray-400 mt-2">Log in to your admin account</p>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-5">
//               {/* Email Input */}
//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
//                 <input
//                   type="email"
//                   placeholder="admin@devprediction.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-5 py-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-gray-600"
//                 />
//               </div>

//               {/* Password Input */}
//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-400 uppercase ml-1">Secure Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-5 py-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-gray-600"
//                   />
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-400 transition-colors"
//                   >
//                     {showPassword ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
//                   </span>
//                 </div>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
//                     <p className="text-red-500 text-xs text-center font-bold italic">{error}</p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
//               >
//                 {loading ? (
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 ) : (
//                     <>
//                         Access Dashboard
//                         <LayoutDashboard size={18} className="group-hover:translate-x-1 transition-transform" />
//                     </>
//                 )}
//               </button>

//               <div className="flex justify-between items-center pt-2">
//                 <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
//                     <input type="checkbox" className="accent-indigo-500 rounded" /> Remember session
//                 </label>
//                 <Link to="/forget-password">
//                     <p className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
//                         Forgot Key?
//                     </p>
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer Branding */}
//       <p className="absolute bottom-6 text-gray-600 text-xs font-medium tracking-widest uppercase">
//         Protected by DevPrediction Security Protocol v4.2
//       </p>
//     </div>
//   );
// }



import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShieldCheck, AlertCircle } from "lucide-react";
// Import the service you created
import { loginAdmin } from "../../api/apiServices"; 

export default function DevPredictionLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic Validation
    if (!email || !password) {
      setLoading(false);
      return setError("Please enter your admin credentials");
    }

    try {
      // ✅ REAL API CALL
      // This function already handles localStorage.setItem("token", ...) inside apiServices.js
      const result = await loginAdmin({ email, password });
      
      console.log("Login Successful for:", result.user.email);
      
      // Redirect to dashboard
      navigate("/admin/dashboard");
      
    } catch (err) {
      // ✅ Handle detailed error messages from your backend
      const errorMessage = err.response?.data?.message || "Invalid credentials or unauthorized access";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Tech Orbs/Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-0 bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 z-10 mx-4">
        
        {/* Left Side: Branding & Info */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative">
          <div className="z-10">
             <h1 className="text-2xl font-black tracking-tighter italic">DEVPREDICTION</h1>
             <p className="text-indigo-100 mt-2 font-medium opacity-80 uppercase text-[10px] tracking-widest">Admin Control Center</p>
          </div>

          <div className="z-10">
            <ShieldCheck size={48} className="mb-4 text-indigo-200" />
            <h2 className="text-3xl font-bold leading-tight">Secure Management <br/> for Professional Sports Data.</h2>
            <p className="mt-4 text-indigo-100/70 text-sm">Monitor real-time predictions, manage VIP users, and audit platform transactions.</p>
          </div>

          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 bg-[#1e293b]">
          <div className="max-w-[360px] mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-extrabold text-white">System Access</h3>
              <p className="text-gray-400 mt-2">Authorized personnel only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="admin@devprediction.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-gray-600"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Access Key</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-gray-600"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 animate-pulse">
                    <AlertCircle size={16} className="text-red-500" />
                    <p className="text-red-500 text-[11px] font-bold italic">{error}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        Access Control
                        <LayoutDashboard size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </button>

              <div className="flex justify-between items-center pt-2">
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input type="checkbox" className="accent-indigo-500 rounded border-gray-700 bg-gray-800" /> Remember me
                </label>
                {/* <Link to="/forget-password">
                    <p className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Forgot Key?
                    </p>
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="absolute bottom-6 text-gray-600 text-[10px] font-medium tracking-widest uppercase">
        Protected by DevPrediction Security Protocol v4.2
      </p>
    </div>
  );
}