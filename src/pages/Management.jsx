import React, { useState } from "react";
import { FiSearch, FiEdit2, FiX } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import img1 from '../assets/chops.png'
const menuItems = [
  {
    name: "Jollof Rice",
    description: "African-style rice with tomato",
    category: "Rice",
    price: "12,500",
    status: "Available",
    icon: "🍚",
  },
  {
    name: "Afang Soup",
    description: "Traditional soup prepared with goat meat, stockfish, periwinkle",
    category: "Soups",
    price: "5,000",
    status: "Unavailable",
    icon: "🍲",
  },
  {
    name: "Grilled Chicken",
    description: "Well-seasoned grilled chicken with a smoky flavor",
    category: "Protein",
    price: "6,000",
    status: "Available",
    icon: "🍗",
  },
  {
    name: "Pasta",
    description: "West African-style pasta with tomato sauce",
    category: "Pasta",
    price: "10,000",
    status: "Unavailable",
    icon: "🍝",
  },
  {
    name: "Vanilla Ice Cream",
    description: "Rich chocolate ice cream topped with smooth chocolate frosting",
    category: "Ice Cream",
    price: "12,000",
    status: "Available",
    icon: "🍦",
  },
];

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

export default function MenuManagement() {
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

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4efe6] p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex mt-10 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 font-roboto">
              Menu Management
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Add, edit, and manage menu items and their availability.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#c09b2f] text-white px-5 py-2.5 rounded-xl md:rounded-[14px] text-sm md:text-[13px] font-medium shadow-sm transition-colors flex items-center gap-1.5"
          >
            + Add Items
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px] font-dm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl md:rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-[#F6E9EA] text-gray-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-roboto font-semibold">ITEM</th>
                  <th className="px-6 py-4 font-roboto font-semibold">CATEGORY</th>
                  <th className="px-6 py-4 font-roboto font-semibold">PRICE</th>
                  <th className="px-6 py-4 font-roboto font-semibold">STATUS</th>
                  <th className="px-6 py-4 font-roboto font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[15.19px] bg-gray-50 border border-gray-200 flex items-center justify-center text-xl">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₦{item.price}</td>
                    <td className="px-6 py-4">
                      <button
                        className={`px-3.5 py-1.5 text-sm font-medium rounded-full border flex items-center gap-1.5 ${statusStyles[item.status].bg} ${statusStyles[item.status].text} ${statusStyles[item.status].border} ${statusStyles[item.status].hover} transition-colors`}
                      >
                        {item.status}
                        <span className="text-xs opacity-70">▼</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-1.5 text-gray-500 hover:text-[#D4AF37] rounded hover:bg-gray-100 transition-colors">
                          <FiEdit2 size={18} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100 transition-colors">
                          <BsThreeDotsVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ──────────────────────────────────────
            ADD ITEM MODAL
        ────────────────────────────────────── */}
        {isAddModalOpen && (
          <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="px-6 py-3  bg-white/80">
                <h2 className="text-xl mt-3 font-bold text-center md:text-center text-[#A61E30]">
                  Add New Item
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
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  placeholder="Rice"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[28px] rounded-tl-[5px]  font-dm"
                />

                <input
                  type="text"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  placeholder="6,000"
                  required
                  className="pl-3  pr-4 py-2 w-full bg-white border shadow-sm text-gray-500 outline-none rounded-[40px] rounded-tl-[5px]  font-dm"
                />

               

                <div className="relative">
  <textarea
    name="description"
    value={newItem.description}
    onChange={handleInputChange}
    placeholder="African-style rice with tomato and spices"
    rows={3}
    className="
      pl-10 pr-4 py-3 min-h-[96px] w-full 
      bg-white border border-gray-300 shadow-sm 
      text-gray-700 placeholder-gray-500 outline-none 
      rounded-[28px] rounded-tl-[8px] 
      font-dm resize-none
      focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all
    "
  />
  <div className="absolute left-4 top-3 text-gray-400">
   
  </div>
</div>

                {/* Smaller image preview */}
                <div className="relative group mt-2">
                  <div className="
                    w-full h-32
                    bg-gray-50 rounded-xl 
                    border-2 border-dashed border-gray-300 
                    overflow-hidden
                  ">
                    {newItem.imagePreview ? (
                      <img
                        src={newItem.imagePreview}
                        alt="Item preview"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        {/* <div className="text-4xl mb-1">📷</div> */}
                        <p className="text-xs">Tap to upload image</p>
                      </div>
                    )}
                  </div>

                  <label className="
                    absolute inset-0 flex items-center justify-center 
                    bg-black/35 opacity-0 group-hover:opacity-100 
                    transition-opacity cursor-pointer rounded-xl
                  ">
                    <div className="
                      bg-white/95 px-4 py-2 text-sm font-medium rounded-[11.2px] 
                      shadow flex items-center gap-2 text-gray-800
                    ">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

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
                    Save
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