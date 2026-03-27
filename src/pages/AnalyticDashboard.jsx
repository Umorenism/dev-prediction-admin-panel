// import React, { useState } from "react";
// import { ShoppingCart, Clock, CheckCircle } from "lucide-react";
// import { CiDeliveryTruck } from "react-icons/ci";
// import { TbCurrencyNaira } from "react-icons/tb";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
// import { FaArrowUpLong } from "react-icons/fa6";

// export default function AnalyticsPage(){
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // ──────────────────────────────────────────────
//   // Data – must be defined before using it
//   // ──────────────────────────────────────────────

//   const stats = [
//     {
//       title: "Daily Orders",
//       value: "156",
//       change: "↑12% vs yesterday",
//       icon: ShoppingCart,
//       color: "text-green-600",
//     },
//     {
//       title: "Daily Revenue",
//       value: "141,000",
//       change: "↓15% up",
//       icon: Clock,
//       color: "text-green-600",
//     },
//     {
//       title: "Avg Delivery",
//       value: "28 min",
//       change: "↑2 min faster",
//       icon: CiDeliveryTruck,
//       color: "text-green-600",
//     },

//   ];

//   const orders = [
//     {
//       id: "#ORD-7732",
//       initials: "CA",
//       name: "Chukwuma Adeyemi",
//       total: "12,500",
//       status: "Order Received",
//       date: "Oct 24, 2023",
//     },
//     {
//       id: "#ORD-7731",
//       initials: "AN",
//       name: "Amara Nwosu",
//       total: "8,200",
//       status: "Preparing Food",
//       date: "Oct 24, 2023",
//     },
//     {
//       id: "#ORD-7730",
//       initials: "CO",
//       name: "Chinelo Okoro",
//       total: "15,000",
//       status: "Ready for Pickup",
//       date: "Oct 23, 2023",
//     },
//     {
//       id: "#ORD-7729",
//       initials: "CA",
//       name: "Chukwuma Adeyemi",
//       total: "12,500",
//       status: "Order Received",
//       date: "Oct 24, 2023",
//     },
//   ];

//   // Now we can safely calculate pagination values
//   const totalPages = Math.ceil(orders.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

//   const chartData = [
//     { day: "Mon", orders: 40 },
//     { day: "Tue", orders: 55 },
//     { day: "Wed", orders: 55 },
//     { day: "Thu", orders: 70 },
//     { day: "Fri", orders: 40 },
//     { day: "Sat", orders: 65 },
//     { day: "Sun", orders: 85 },
//   ];

//   const statusDistribution = {
//     completed: 68,
//     pending: 18,
//     cancelled: 4,
//   };

//   const totalOrdersStatus = 68 + 18 + 4;

//   return (
//     <div className="bg-[#F4EBDD] min-h-screen p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
//         {/* Header / Title */}
//         <div className="mb-6 mt-8 md:mt-10">
//           <h1 className="text-2xl md:text-3xl font-semibold font-roboto text-gray-800">
//            Analytics
//           </h1>
//           <p className="text-sm md:text-base text-gray-500 font-dm mt-1.5">
//             Welcome back! Here's today's snap shot
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
//           {stats.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-start justify-between gap-4 hover:shadow transition-shadow"
//             >
//               <div className="space-y-1.5 flex-1">
//                 <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide">
//                   {item.title}
//                 </p>
//                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">
//                   {item.value}
//                 </h2>
//                 <p className={`text-xs md:text-sm font-medium ${item.color}`}>
//                   {item.change}
//                 </p>
//               </div>
//               <div className="p-2.5 rounded-full bg-orange-50 border border-orange-100/70 flex-shrink-0">
//                 <item.icon size={15} className="text-orange-600" strokeWidth={2.2} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Weekly Orders Chart */}
//           <div className="lg:col-span-1 bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100">
//             <h3 className="text-[20px] font-bold text-gray-800 mb-6 font-roboto">Daily Orders</h3>

//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
//                 <CartesianGrid stroke="#f5f6f8" horizontal vertical />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   ticks={[0, 20, 40, 60, 80]}
//                   tick={{ fill: "#6B7280", fontSize: 12 }}
//                 />
//                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
//                 <Tooltip
//                   cursor={{ fill: "transparent" }}
//                   content={({ active, payload, label }) => {
//                     if (active && payload && payload.length) {
//                       return (
//                         <div className="bg-[#A61E30] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg relative">
//                           <span>{label}</span>
//                           <br />
//                           <span>{payload[0].value} Orders</span>

//                           {/* Sharp pointer */}
//                           <div
//                             className="absolute bottom-[-6px] left-4 w-0 h-0
//                               border-t-[10px] border-t-[#A61E30]
//                               border-l-[6px] border-l-transparent
//                               border-r-[10px] border-r-transparent"
//                           />
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Bar dataKey="orders" fill="#EBDAA3" radius={[6, 6, 0, 0]} barSize={40} />
//               </BarChart>
//             </ResponsiveContainer>

//           </div>

//           {/* Order Status */}
//           <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 flex flex-col">
//            <div className=" bg-white flex justify-between items-center">
//             <h3 className="text-[20px] font-bold text-gray-800 mb-6 font-roboto">Revenue Trend</h3>
//             <div>
//               <p>Daily</p>
//             </div>
//             </div>

//           </div>
//         </div>

//         {/* Recent Orders Table with Pagination */}
//         <div className="bg-white rounded-[12px] shadow-sm border border-gray-100 overflow-hidden">

//          <h1>Delivery Performance (Avg Minutes)</h1>

//         </div>

//       </div>
//     </div>
//   );
// };

import React from "react";
import { ShoppingCart, TrendingUp } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

/* ✅ CUSTOM TOOLTIP (LEFT CHAT BUBBLE) */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative">
        {/* Bubble */}
        <div className="bg-[#A61E30] text-white text-[11px] px-4 py-1 rounded-[11px] shadow-md">
          <p className="font-semibold">{label}</p>
          <p>{payload[0].value} Orders</p>
        </div>

        {/* LEFT POINTER */}
        <div
          className="absolute bottom-[-6px] left-1 w-0 h-1
                              border-t-[10px] border-t-[#A61E30]
                              border-l-[0px] border-l-transparent
                              border-r-[10px] border-r-transparent"
        ></div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Daily Orders",
      value: "156",
      change: "↑ 12%",
      changeColor: "text-green-600",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Daily Revenue",
      value: "₦141,000",
      change: "↑ 5.5%",
      changeColor: "text-green-600",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Avg Delivery",
      value: "28 min",
      change: "↑ 2 min faster",
      changeColor: "text-green-600",
      icon: CiDeliveryTruck,
      trend: "up",
    },
  ];

  const dailyOrdersData = [
    { day: "Mon", orders: 40 },
    { day: "Tue", orders: 55 },
    { day: "Wed", orders: 55 },
    { day: "Thu", orders: 70 },
    { day: "Fri", orders: 40 },
    { day: "Sat", orders: 65 },
    { day: "Sun", orders: 85 },
  ];

  const revenueTrendData = [
    { time: "Mar 7", revenue: 80 },
    { time: "Mar 8", revenue: 120 },
    { time: "Mar 9", revenue: 90 },
    { time: "Mar 10", revenue: 140 },
    { time: "Mar 11", revenue: 110 },
    { time: "Mar 12", revenue: 160 },
    { time: "Mar 13", revenue: 175 },
  ];

  const deliveryPerfData = [
    { hour: "8am", minutes: 32 },
    { hour: "9am", minutes: 30 },
    { hour: "10am", minutes: 29 },
    { hour: "11am", minutes: 31 },
    { hour: "12pm", minutes: 28 },
    { hour: "1pm", minutes: 27 },
    { hour: "2pm", minutes: 30 },
    { hour: "3pm", minutes: 34 },
    { hour: "4pm", minutes: 37 },
    { hour: "5pm", minutes: 38 },
    { hour: "6pm", minutes: 39 },
    { hour: "7pm", minutes: 38 },
    { hour: "8pm", minutes: 40 },
  ];

  return (
    <div className="bg-[#F8F1E6] min-h-screen p-5 sm:p-6 md:p-8 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl mt-10 md:text-3xl font-bold text-gray-800">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's today's snap shot
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow border flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-gray-500 uppercase">{stat.title}</p>
                <h2 className="text-2xl text-black font-bold">{stat.value}</h2>

                <div
                  className={`flex items-center gap-1 text-sm ${stat.changeColor}`}
                >
                  {stat.trend === "up" ? (
                    <FaArrowUpLong size={12} />
                  ) : (
                    <FaArrowDownLong size={12} />
                  )}
                  {stat.change}
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-full">
                <stat.icon size={22} className="text-orange-600" />
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* DAILY ORDERS */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-bold text-[#1F2937] text-lg mb-4">
              Daily Orders
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dailyOrdersData}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />

                {/* ✅ CUSTOM TOOLTIP HERE */}
                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="orders"
                  fill="#EBDAA3"
                  radius={[8, 8, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* REVENUE TREND */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-4 text-[#1F2937]">
              Revenue Trend
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueTrendData}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis />

                {/* <Tooltip /> */}
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#A61E30] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg relative">
                          <span>{label}</span>
                          <br />
                          <span>{payload[0].value} Orders</span>

                          {/* Sharp pointer */}
                          <div
                            className="absolute bottom-[-6px] left-1 w-0 h-1
                                              border-t-[10px] border-t-[#A61E30]
                                              border-l-[0px] border-l-transparent
                                              border-r-[10px] border-r-transparent"
                          />
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#A61E30"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DELIVERY PERFORMANCE */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-bold text-gray-800 text-lg mb-4">
            Delivery Performance (Avg Minutes)
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={deliveryPerfData}>
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="hour" />
              <YAxis domain={[20, 45]} />

              {/* <Tooltip /> */}
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#A61E30] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg relative">
                        <span>{label}</span>
                        <br />
                        <span>{payload[0].value} Orders</span>

                        {/* Sharp pointer */}
                        <div
                          className="absolute bottom-[-6px] left-1 w-0 h-1
                                            border-t-[10px] border-t-[#A61E30]
                                            border-l-[0px] border-l-transparent
                                            border-r-[10px] border-r-transparent"  />
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#F4A261"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
