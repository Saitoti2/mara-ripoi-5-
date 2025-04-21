import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SafariExperiences.css";

const SafariExperiences = ({ experiences, onAdd, onUpdate, onDelete, userRole }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    rating: 0
  });
  const [localExperiences, setLocalExperiences] = useState(experiences);

  
  useEffect(() => {
    const savedExperiences = localStorage.getItem('experiences');
    if (savedExperiences) {
      setLocalExperiences(JSON.parse(savedExperiences));
    } else {
      setLocalExperiences(experiences);
    }
  }, [experiences]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const newExp = {
      ...newExperience,
      id: Date.now().toString() // Temporary ID
    };
    
    
    const updatedExperiences = [...localExperiences, newExp];
    setLocalExperiences(updatedExperiences);
    
   
    localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
    
    
    onAdd(newExperience);
    
    setNewExperience({
      title: "",
      description: "",
      image: "",
      price: "",
      rating: 0
    });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
   
    const updatedExperiences = localExperiences.filter(exp => exp.id !== id);
    setLocalExperiences(updatedExperiences);
    
   
    localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
    
    
    onDelete(id);
  };

  const isAdmin = userRole === "admin";

  return (
    <section className="safari-experiences py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl font-bold text-black-800 mb-4">Safari Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of safari experiences designed to bring you
            closer to nature and create unforgettable memories.
          </p>
        </div>

        {isAdmin && (
          <div className="admin-controls mb-8">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Add New Experience
              </button>
            ) : (
              <div className="add-experience-form bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Add New Safari Experience</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="title" className="block text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newExperience.title}
                        onChange={(e) =>
                          setNewExperience({ ...newExperience, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price" className="block text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        value={newExperience.price}
                        onChange={(e) =>
                          setNewExperience({ ...newExperience, price: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group md:col-span-2">
                      <label htmlFor="description" className="block text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={newExperience.description}
                        onChange={(e) =>
                          setNewExperience({ ...newExperience, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image" className="block text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        value={newExperience.image}
                        onChange={(e) =>
                          setNewExperience({ ...newExperience, image: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rating" className="block text-gray-700 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        id="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newExperience.rating}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            rating: parseFloat(e.target.value)
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Add Experience
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        <div className="experiences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localExperiences.map((experience) => (
            <div
              key={experience.id}
              className="experience-card bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative" style={{ height: "250px", overflow: "hidden" }}>
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{experience.title}</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {experience.rating} ★
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">{experience.price}</span>
                  <Link
                    to={`/experience/${experience.id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
                
                {isAdmin && (
                  <div className="admin-actions mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/admin?edit=experience&id=${experience.id}`}
                      className="text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafariExperiences;
