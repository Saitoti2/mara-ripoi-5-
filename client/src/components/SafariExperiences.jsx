import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceUpdateModal from "src/components/ExperienceUpdateModal";

// ✅ Default safari experiences
const safariExperiences = [
  {
    id: 1,
    title: "Masai Mara Adventure",
    description: "Experience the wildlife of Kenya's famous game reserve.",
    image: "https://example.com/masai-mara.jpg",
    price: "$1200",
    rating: 4.8
  },
  {
    id: 2,
    title: "Serengeti Safari",
    description: "Witness the Great Migration and stunning landscapes.",
    image: "https://example.com/serengeti.jpg",
    price: "$1500",
    rating: 4.9
  }
];

const SafariExperiences = ({ experiences = safariExperiences, onAdd, onUpdate, onDelete, userRole }) => {
  const [localExperiences, setLocalExperiences] = useState(experiences);
  const [editingExperience, setEditingExperience] = useState(null);
  const navigate = useNavigate();

  // Only simulate admin privileges if required for testing; this would come from your auth system later
  const isAdmin = userRole === "admin"; 

  useEffect(() => {
    setLocalExperiences(experiences);
  }, [experiences]);

  const deleteExperience = (id) => {
    const updated = localExperiences.filter((exp) => exp.id !== id);
    setLocalExperiences(updated);
    onDelete?.(id);
  };

  const updateExperience = (id, updatedData) => {
    const updated = localExperiences.map((exp) =>
      exp.id === id ? { ...exp, ...updatedData } : exp
    );
    setLocalExperiences(updated);
    onUpdate?.(id, updatedData);
    setEditingExperience(null); // close modal
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Safari Experiences</h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {localExperiences.length > 0 ? (
          localExperiences.map((experience) => (
            <div
              key={experience.id}
              className="w-[320px] bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition relative"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/experience/${experience.id}`)}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{experience.title}</h3>
                <p className="text-gray-600 mt-2">{experience.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-orange-500 font-semibold">{experience.price}</span>
                  <span className="text-yellow-500">⭐ {experience.rating}</span>
                </div>
              </div>

              {/* Conditionally render Edit and Delete buttons for Admin only */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => setEditingExperience(experience)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExperience(experience.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No experiences available at the moment.</p>
        )}
      </div>

      {editingExperience && (
        <ExperienceUpdateModal
          experience={editingExperience}
          onClose={() => setEditingExperience(null)}
          onSave={(data) => updateExperience(editingExperience.id, data)}
        />
      )}
    </section>
  );
};

export default SafariExperiences;
