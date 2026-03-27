


import React, { useState } from "react";

import { Bell } from "lucide-react";




export default function Notifications() {
 
  return (
    <div className="min-h-screen bg-[#f4efe6] p-8 font-dm">
  {/* Header */}
  <div className="mb-6 mt-10 flex justify-between items-center">
    <div>
      <h1 className="text-[32px] font-[600] font-dm text-black font-semibold">Notification</h1>
    <p className="text-gray-500 text-sm"> Today </p>
    </div>
    
  </div>

  <div>
        <div className="bg-white rounded-[14px] py-2 p-3 max-w-3xl">
            <div className="flex gap-2">
                <div className="bg-[#F6E9EA] h-10 w-10 rounded-full flex justify-center items-center text-[#A61E30]">
                    <Bell size={20}/>
                </div>
            <div>
                <h1 className="font-dm text-[14px] font-[500] text-[#A61E30]">New Order</h1>
                <p className="text-[#1C0F0D] font-dm text-[12px] font-[300]">Sarah james just placed and order of 2 plates of jellof rice and 2 grill chickens</p>
            </div>
            </div>
        </div>
        <div className="flex justify-end max-w-3xl">
            <p className="text-[10px] font-[500] font-medium text-[#3A3A3A]">2 Min Ago</p>
        </div>
    </div>
  <div className="mt-5">
        <div className="bg-white rounded-[14px] py-2 p-3 max-w-3xl">
            <div className="flex gap-2">
                <div className="bg-[#F6E9EA] h-10 w-10 rounded-full flex justify-center items-center text-[#A61E30]">
                    <Bell size={20}/>
                </div>
            <div>
                <h1 className="font-dm text-[14px] font-[500] text-[#A61E30]">Feed Back</h1>
                <p className="text-[#1C0F0D] font-dm text-[12px] font-[300]">Sarah james just placed and order </p>
            </div>
            </div>
        </div>
        <div className="flex justify-end max-w-3xl">
            <p className="text-[10px] font-[500] font-medium text-[#3A3A3A]">2 Min Ago</p>
        </div>
    </div>
  <div className="mt-5">
        <div className="bg-white rounded-[14px] py-2 p-3 max-w-3xl">
            <div className="flex gap-2">
                <div className="bg-[#F6E9EA] h-10 w-10 rounded-full flex justify-center items-center text-[#A61E30]">
                    <Bell size={20}/>
                </div>
            <div>
                <h1 className="font-dm text-[14px] font-[500] text-[#A61E30]">Feed Back</h1>
                <p className="text-[#1C0F0D] font-dm text-[12px] font-[300]">Sarah james just placed a</p>
            </div>
            </div>
        </div>
        <div className="flex justify-end max-w-3xl">
            <p className="text-[10px] font-[500] font-medium text-[#3A3A3A]">2 Min Ago</p>
        </div>
    </div>
  <div className="mt-5">
        <div className="bg-white rounded-[14px] py-2 p-3 max-w-3xl">
            <div className="flex gap-2">
                <div className="bg-[#F6E9EA] h-10 w-10 rounded-full flex justify-center items-center text-[#A61E30]">
                    <Bell size={20}/>
                </div>
            <div>
                <h1 className="font-dm text-[14px] font-[500] text-[#A61E30]">Feed Back</h1>
                <p className="text-[#1C0F0D] font-dm text-[12px] font-[300]">Sarah james just placed and order of 2 plates of jellof rice and 2 grill chickens</p>
            </div>
            </div>
        </div>
        <div className="flex justify-end max-w-3xl">
            <p className="text-[10px] font-[500] font-medium text-[#3A3A3A]">2 Min Ago</p>
        </div>
    </div>
  
  
</div>
  );
}