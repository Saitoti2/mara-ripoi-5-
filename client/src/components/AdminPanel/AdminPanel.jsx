import React, { useState, useRef, useEffect } from "react";
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
  const [localExperiences, setLocalExperiences] = useState(experiences);
  const [localWildlife, setLocalWildlife] = useState(wildlife);

  const fileInputRef = useRef(null);
  const wildlifeFileInputRef = useRef(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedExperiences = localStorage.getItem('experiences');
    const savedWildlife = localStorage.getItem('wildlife');
    
    if (savedExperiences) {
      setLocalExperiences(JSON.parse(savedExperiences));
    } else {
      setLocalExperiences(experiences);
    }
    
    if (savedWildlife) {
      setLocalWildlife(JSON.parse(savedWildlife));
    } else {
      setLocalWildlife(wildlife);
    }
  }, [experiences, wildlife]);

  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(localExperiences));
    localStorage.setItem('wildlife', JSON.stringify(localWildlife));
  }, [localExperiences, localWildlife]);

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
    const experienceData = {
      ...newExperience,
      image: newExperience.image || "https://via.placeholder.com/400x300?text=No+Image"
    };
    
    if (editingExperience) {
      // Update in local state first for immediate UI update
      const updatedExperiences = localExperiences.map(exp => 
        exp.id === editingExperience.id ? {...exp, ...experienceData} : exp
      );
      setLocalExperiences(updatedExperiences);
      
      // Then update through the prop function (which might update parent state or API)
      onUpdateExperience(editingExperience.id, experienceData);
      setEditingExperience(null);
    } else {
      // Create a new experience with a temporary ID
      const newExp = {
        ...experienceData,
        id: Date.now().toString() // Temporary ID until backend assigns one
      };
      
      // Update local state first
      setLocalExperiences([...localExperiences, newExp]);
      
      // Then add through the prop function
      onAddExperience(experienceData);
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
    const wildlifeData = {
      ...newWildlife,
      image: newWildlife.image || "https://via.placeholder.com/400x300?text=No+Image"
    };
    
    if (editingWildlife) {
      // Update in local state first
      const updatedWildlife = localWildlife.map(animal => 
        animal.id === editingWildlife.id ? {...animal, ...wildlifeData} : animal
      );
      setLocalWildlife(updatedWildlife);
      
      // Then update through the prop function
      onUpdateWildlife(editingWildlife.id, wildlifeData);
      setEditingWildlife(null);
    } else {
      // Create a new wildlife with a temporary ID
      const newAnimal = {
        ...wildlifeData,
        id: Date.now().toString() // Temporary ID
      };
      
      // Update local state first
      setLocalWildlife([...localWildlife, newAnimal]);
      
      // Then add through the prop function
      onAddWildlife(wildlifeData);
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

  const handleDeleteExperience = (id) => {
    // Update local state first
    setLocalExperiences(localExperiences.filter(exp => exp.id !== id));
    // Then delete through the prop function
    onDeleteExperience(id);
  };

  const handleDeleteWildlife = (id) => {
    // Update local state first
    setLocalWildlife(localWildlife.filter(animal => animal.id !== id));
    // Then delete through the prop function
    onDeleteWildlife(id);
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
                    <div className="preview-container" style={{ maxWidth: "200px", marginTop: "10px" }}>
                      <img
                        src={newExperience.image}
                        alt="Preview"
                        className="preview-image"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
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
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  value={newExperience.rating}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, rating: e.target.value })
                  }
                  min="0"
                  max="5"
                  step="0.1"
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
              {localExperiences.map((experience) => (
                <div key={experience.id} className="admin-item">
                  <div className="item-info">
                    <div style={{ width: "150px", height: "100px", overflow: "hidden" }}>
                      <img
                        src={experience.image}
                        alt={experience.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    </div>
                    <div>
                      <h3>{experience.title}</h3>
                      <p>{experience.description.substring(0, 100)}...</p>
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
                      onClick={() => handleDeleteExperience(experience.id)}
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
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={newWildlife.description}
                  onChange={(e) =>
                    setNewWildlife({ ...newWildlife, description: e.target.value })
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
                    <div className="preview-container" style={{ maxWidth: "200px", marginTop: "10px" }}>
                      <img
                        src={newWildlife.image}
                        alt="Preview"
                        className="preview-image"
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      />
                    </div>
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
              {localWildlife.map((animal) => (
                <div key={animal.id} className="admin-item">
                  <div className="item-info">
                    <div style={{ width: "150px", height: "100px", overflow: "hidden" }}>
                      <img
                        src={animal.image}
                        alt={animal.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    </div>
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
                      onClick={() => handleDeleteWildlife(animal.id)}
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
