import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = ({
  experiences,
  wildlife,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
  onAddWildlife,
  onUpdateWildlife,
  onDeleteWildlife,
}) => {
  const [activeTab, setActiveTab] = useState("experiences");
  const [newExperience, setNewExperience] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    rating: 0,
  });
  const [newWildlife, setNewWildlife] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingWildlife, setEditingWildlife] = useState(null);

  const fileInputRef = useRef(null);
  const wildlifeFileInputRef = useRef(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === "experience") {
          setNewExperience((prev) => ({ ...prev, image: e.target.result }));
        } else {
          setNewWildlife((prev) => ({ ...prev, image: e.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault();
    if (editingExperience) {
      onUpdateExperience(editingExperience.id, newExperience);
      setEditingExperience(null);
    } else {
      onAddExperience(newExperience);
    }
    setNewExperience({
      title: "",
      description: "",
      image: "",
      price: "",
      rating: 0,
    });
  };

  const handleWildlifeSubmit = (e) => {
    e.preventDefault();
    if (editingWildlife) {
      onUpdateWildlife(editingWildlife.id, newWildlife);
      setEditingWildlife(null);
    } else {
      onAddWildlife(newWildlife);
    }
    setNewWildlife({
      name: "",
      description: "",
      image: "",
    });
  };

  const startEditingExperience = (experience) => {
    setEditingExperience(experience);
    setNewExperience({
      title: experience.title,
      description: experience.description,
      image: experience.image,
      price: experience.price,
      rating: experience.rating,
    });
  };

  const startEditingWildlife = (animal) => {
    setEditingWildlife(animal);
    setNewWildlife({
      name: animal.name,
      description: animal.description,
      image: animal.image,
    });
  };

  const cancelEditing = () => {
    if (activeTab === "experiences") {
      setEditingExperience(null);
      setNewExperience({
        title: "",
        description: "",
        image: "",
        price: "",
        rating: 0,
      });
    } else {
      setEditingWildlife(null);
      setNewWildlife({
        name: "",
        description: "",
        image: "",
      });
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Mara Ripoi Admin Panel</h1>
        <Link to="/" className="back-to-site">
          Back to Website
        </Link>
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === "experiences" ? "active" : ""}
          onClick={() => setActiveTab("experiences")}
        >
          Safari Experiences
        </button>
        <button
          className={activeTab === "wildlife" ? "active" : ""}
          onClick={() => setActiveTab("wildlife")}
        >
          Wildlife
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "experiences" ? (
          <div className="experiences-management">
            <h2>{editingExperience ? "Edit Experience" : "Add New Experience"}</h2>
            <form onSubmit={handleExperienceSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={newExperience.title}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={newExperience.description}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "experience")}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="upload-btn"
                  >
                    Upload Image
                  </button>
                  {newExperience.image && (
                    <img
                      src={newExperience.image}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={newExperience.price}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating (0-5):</label>
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
                      rating: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingExperience ? "Update Experience" : "Add Experience"}
                </button>
                {editingExperience && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2>Manage Experiences</h2>
            <div className="items-list">
              {experiences.map((experience) => (
                <div key={experience.id} className="admin-item">
                  <div className="item-info">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                    <div>
                      <h3>{experience.title}</h3>
                      <p>{experience.description.substring(0, 100)}...</p>
                      <p>
                        <strong>Price:</strong> {experience.price} | <strong>Rating:</strong>{" "}
                        {experience.rating}/5
                      </p>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => startEditingExperience(experience)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteExperience(experience.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="wildlife-management">
            <h2>{editingWildlife ? "Edit Wildlife" : "Add New Wildlife"}</h2>
            <form onSubmit={handleWildlifeSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={newWildlife.name}
                  onChange={(e) =>
                    setNewWildlife({ ...newWildlife, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="wildlife-description">Description:</label>
                <textarea
                  id="wildlife-description"
                  value={newWildlife.description}
                  onChange={(e) =>
                    setNewWildlife({ ...newWildlife, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="wildlife-image">Image:</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="wildlife-image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "wildlife")}
                    className="hidden"
                    ref={wildlifeFileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => wildlifeFileInputRef.current.click()}
                    className="upload-btn"
                  >
                    Upload Image
                  </button>
                  {newWildlife.image && (
                    <img
                      src={newWildlife.image}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingWildlife ? "Update Wildlife" : "Add Wildlife"}
                </button>
                {editingWildlife && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2>Manage Wildlife</h2>
            <div className="items-list">
              {wildlife.map((animal) => (
                <div key={animal.id} className="admin-item">
                  <div className="item-info">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                    <div>
                      <h3>{animal.name}</h3>
                      <p>{animal.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => startEditingWildlife(animal)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteWildlife(animal.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
