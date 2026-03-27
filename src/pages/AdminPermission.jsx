import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2, FiRefreshCw, FiTrash2, FiPower } from "react-icons/fi";

const statusStyles = {
  Available: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    hover: "hover:bg-green-200",
  },
  Unavailable: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    hover: "hover:bg-red-200",
  },
};

export default function AdminPermission() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "Available",
    imageFile: null,        // actual File object for upload
    imagePreview: null,     // local URL for preview
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // ────────────────────────────────────────────────
  //  Handle image selection + preview
  // ────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: basic validation (size, type)
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setNewItem((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  // ────────────────────────────────────────────────
  //  Submit form (with image ready for upload)
  // ────────────────────────────────────────────────
  const handleAddItem = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newItem.name || !newItem.category || !newItem.price) {
      alert("Please fill in all required fields");
      return;
    }

    // Prepare data to send to backend
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("category", newItem.category);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description || "");
    formData.append("status", newItem.status);

    if (newItem.imageFile) {
      formData.append("image", newItem.imageFile);
    }

    try {
      // Example: real API call (uncomment & adjust)
      // const response = await fetch("/api/menu-items", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!response.ok) throw new Error("Failed to add item");

      console.log("Submitting new item:", {
        name: newItem.name,
        category: newItem.category,
        price: newItem.price,
        description: newItem.description,
        status: newItem.status,
        hasImage: !!newItem.imageFile,
      });

      // Reset form
      setNewItem({
        name: "",
        category: "",
        price: "",
        description: "",
        status: "Available",
        imageFile: null,
        imagePreview: null,
      });

      setIsAddModalOpen(false);

      // In real app: refresh list / show success toast
      alert("Item added successfully! (demo)");
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item. Please try again.");
    }
  };

 
  return (
    <div className="min-h-screen bg-[#f4efe6] p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex mt-10 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 font-roboto">
              Admin Management
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              3 admin accounts
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#c09b2f] text-white px-5 py-2.5 rounded-xl md:rounded-[14px] text-sm md:text-[13px] font-medium shadow-sm transition-colors flex items-center gap-1.5"
          >
            + Create Admin
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px] font-dm"
          />
        </div>

        <div className="bg-[#f7f7f7] rounded-2xl p-6 shadow-sm border border-gray-200 overflow-x-auto">
  <table className="w-full text-left border-separate border-spacing-y-4">
    <thead>
      <tr className="text-gray-500 text-sm">
        <th>ADMIN ID</th>
        <th>NAME</th>
        <th>EMAIL ADDRESS</th>
        <th>PHONE</th>
        <th>ROLES</th>
        <th>STATUS</th>
        <th>CREATED</th>
        <th>ACTION</th>
      </tr>
    </thead>

    <tbody>
      {[
        {
          id: "A001",
          initials: "CA",
          name: "Chukwuma Adeyemi",
          email: "Chuck@queensplate.com",
          phone: "+234 801 234 5678",
          role: "Admin",
          status: "Active",
        },
        {
          id: "A002",
          initials: "AN",
          name: "Amara Nwosu",
          email: "Amara@queensplate.com",
          phone: "+234 802 345 6789",
          role: "Manager",
          status: "Inactive",
        },
        {
          id: "A003",
          initials: "CO",
          name: "Chinelo Okoro",
          email: "Chinelo@queensplate.com",
          phone: "+234 803 456 7890",
          role: "Admin",
          status: "Active",
        },
      ]
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((admin, index) => (
          <tr
            key={index}
            className=" text-sm"
          >
            <td className="py-4 text-gray-500 px-2">{admin.id}</td>

            {/* Name + Avatar */}
            <td className="py-4 px-2 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 bg-gray-300 font-dm text-xs font-semibold">
                {admin.initials}
              </div>
              <span className="text-gray-500">{admin.name}</span>
            </td>

            <td className="py-4 px-2 text-gray-600">{admin.email}</td>
            <td className="py-4 px-2 text-gray-600">{admin.phone}</td>

            {/* Role */}
            <td className="py-4 px-2">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  admin.role === "Admin"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {admin.role}
              </span>
            </td>

            {/* Status */}
            <td className="py-4 px-2">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  admin.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {admin.status}
              </span>
            </td>

            <td className="py-4 px-2 text-gray-500">
              Oct 24, 2023
            </td>

            {/* Actions */}
            <td className="py-4 px-2 flex items-center gap-3 text-gray-500">
              <FiEdit2 className="cursor-pointer hover:text-black" />

              <button
                onClick={() => alert("Toggle status")}
                className="cursor-pointer hover:text-black"
              >
               <FiPower/>
              </button>
              <button
                onClick={() => alert("Toggle status")}
                className="cursor-pointer hover:text-black"
              >
               <FiRefreshCw/>
              </button>

              <button
                onClick={() => alert("Delete admin")}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>
       
        {isAddModalOpen && (
          <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="px-6 py-3  bg-white/80">
                <h2 className="text-xl mt-3 font-bold text-center md:text-center text-[#A61E30]">
                 Create Admin
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleAddItem} className="p-6 space-y-5">
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Jollof Rice"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px]  font-dm"
                />

                <input
                  type="text"
                  name="email"
                  value={newItem.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[28px] rounded-tl-[5px]  font-dm"
                />

                <input
                  type="text"
                  name="Phone"
                  value={newItem.phone}
                  onChange={handleInputChange}
                  placeholder="phone number"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px]  font-dm"
                />
                <input
                  type="text"
                  name="Phone"
                  value={newItem.role}
                  onChange={handleInputChange}
                  placeholder="Role"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px]  font-dm"
                />

               

            

              

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-6 py-2.5 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-[11.2px] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#A61E30] hover:bg-red-700 text-white rounded-[11.2px] transition-colors font-medium shadow-sm"
                  >
                   Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}