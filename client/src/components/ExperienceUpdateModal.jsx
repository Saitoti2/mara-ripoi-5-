// components/ExperienceUpdateModal.jsx
import React, { useState } from "react";

const ExperienceUpdateModal = ({ experience, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...experience });
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">Edit Safari Experience</h2>

        <div
          className={`w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer mb-4 ${
            dragActive ? "border-blue-500" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          {formData.image ? (
            <img
              src={formData.image}
              alt="Preview"
              className="h-full object-contain"
            />
          ) : (
            <span className="text-gray-400">Drag and drop image here</span>
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-3"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-3"
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Confirm Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceUpdateModal;
