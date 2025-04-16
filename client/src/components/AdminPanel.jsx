import React, { useState, useRef } from "react";

// Dummy data
const experiencesData = [
  {
    id: 1,
    title: "Safari Experience 1",
    description: "An amazing safari through the savannah.",
    price: "$500",
    rating: 4.5,
    image: "https://via.placeholder.com/300",
  },
];

const wildlifeData = [
  {
    id: 1,
    name: "Elephant",
    description: "Large mammal known for its tusks and intelligence.",
    habitat: "Savannah",
    image: "https://via.placeholder.com/300",
  },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("safari"); // 'safari' or 'wildlife'
  const [experiences, setExperiences] = useState(experiencesData);
  const [wildlife, setWildlife] = useState(wildlifeData);
  const [editItem, setEditItem] = useState(null);
  const fileInputRef = useRef(null);

  const userRole = "admin";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditItem((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpdate = (id, updatedItem) => {
    if (activeTab === "safari") {
      setExperiences((prev) => {
        const exists = prev.some((item) => item.id === id);
        return exists
          ? prev.map((item) =>
              item.id === id ? { ...item, ...updatedItem } : item
            )
          : [...prev, updatedItem];
      });
    } else {
      setWildlife((prev) => {
        const exists = prev.some((item) => item.id === id);
        return exists
          ? prev.map((item) =>
              item.id === id ? { ...item, ...updatedItem } : item
            )
          : [...prev, updatedItem];
      });
    }
  };

  const onDelete = (id) => {
    if (activeTab === "safari") {
      setExperiences((prev) => prev.filter((item) => item.id !== id));
    } else {
      setWildlife((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const currentItems = activeTab === "safari" ? experiences : wildlife;
  const isEditing = currentItems.some((i) => i.id === editItem?.id);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "safari" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("safari")}
        >
          Safari Experiences
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "wildlife" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("wildlife")}
        >
          Wildlife
        </button>
      </div>

      {/* Add New */}
      {userRole === "admin" && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={() =>
            setEditItem(
              activeTab === "safari"
                ? {
                    id: Date.now(),
                    title: "",
                    description: "",
                    price: "",
                    rating: 0,
                    image: "",
                  }
                : {
                    id: Date.now(),
                    name: "",
                    description: "",
                    habitat: "",
                    image: "",
                  }
            )
          }
        >
          + Add New {activeTab === "safari" ? "Safari Experience" : "Wildlife"}
        </button>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt={item.title || item.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
            <p>{item.description}</p>

            {activeTab === "safari" ? (
              <>
                <p className="text-sm text-gray-600">Price: {item.price}</p>
                <p className="text-sm text-gray-600">Rating: {item.rating}</p>
              </>
            ) : (
              <p className="text-sm text-gray-600">Habitat: {item.habitat}</p>
            )}

            {userRole === "admin" && (
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditItem(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {isEditing
                ? `Edit ${activeTab === "safari" ? "Safari" : "Wildlife"}`
                : `Add New ${activeTab === "safari" ? "Safari Experience" : "Wildlife"}`}
            </h3>

            {/* Image Section */}
            <div className="relative mb-4 h-48 bg-gray-100 rounded overflow-hidden">
              {editItem.image ? (
                <img
                  src={editItem.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Image Selected
                </div>
              )}
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold hover:bg-opacity-70 transition"
              >
                {editItem.image ? "Change Image" : "Add Image"}
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>

            {/* Form Inputs */}
            {activeTab === "safari" ? (
              <>
                <input
                  className="w-full border p-2 mb-2"
                  placeholder="Title"
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full border p-2 mb-2"
                  placeholder="Description"
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                />
                <input
                  className="w-full border p-2 mb-2"
                  placeholder="Price"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="w-full border p-2 mb-2"
                  placeholder="Rating"
                  value={editItem.rating}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      rating: parseFloat(e.target.value),
                    })
                  }
                />
              </>
            ) : (
              <>
                <input
                  className="w-full border p-2 mb-2"
                  placeholder="Name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
                <textarea
                  className="w-full border p-2 mb-2"
                  placeholder="Description"
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                />
                <input
                  className="w-full border p-2 mb-2"
                  placeholder="Habitat"
                  value={editItem.habitat}
                  onChange={(e) =>
                    setEditItem({ ...editItem, habitat: e.target.value })
                  }
                />
              </>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => {
                  onUpdate(editItem.id, editItem);
                  setEditItem(null);
                }}
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
