import React, { useState } from "react";
import axios from "axios";

const WildlifeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    habitat: "",
    description: "",
    conservation_status: "",
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    axios
      .post("http://127.0.0.1:8000/api/wildlife/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSuccessMessage("Wildlife added successfully!");
        setFormData({
          name: "",
          species: "",
          habitat: "",
          description: "",
          conservation_status: "",
          image: null,
        });
      })
      .catch((err) => {
        console.error("Error uploading wildlife:", err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Add New Wildlife</h2>

      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="species"
            placeholder="Species"
            value={formData.species}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="habitat"
            placeholder="Habitat"
            value={formData.habitat}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="conservation_status"
            placeholder="Conservation Status"
            value={formData.conservation_status}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WildlifeForm;
