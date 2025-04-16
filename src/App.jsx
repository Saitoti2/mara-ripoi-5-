import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import SafariExperiences from "./components/SafariExperiences.jsx";
import OurWildlife from "./components/OurWildlife.jsx";
import ConservationEfforts from "./components/ConservationEfforts.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import ExperienceDetails from "./components/ExperienceDetails.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

// Dummy data
const defaultSafariExperiences = [
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

const defaultWildlife = [
  {
    id: 1,
    name: "Lion",
    description: "King of the Jungle, known for its strength and pride.",
    image: "https://example.com/lion.jpg"
  },
  {
    id: 2,
    name: "Elephant",
    description: "The largest land animal, revered for its intelligence.",
    image: "https://example.com/elephant.jpg"
  }
];

// Home Component
const Home = ({
  experiences,
  wildlife,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
  onAddWildlife,
  onUpdateWildlife,
  onDeleteWildlife,
  userRole
}) => (
  <>
    <Hero />
    <Stats />
    <SafariExperiences
      experiences={experiences}
      onAdd={onAddExperience}
      onUpdate={onUpdateExperience}
      onDelete={onDeleteExperience}
      userRole={userRole} // Pass userRole to SafariExperiences
    />
    <OurWildlife
      wildlife={wildlife}
      onAdd={onAddWildlife}
      onUpdate={onUpdateWildlife}
      onDelete={onDeleteWildlife}
      userRole={userRole} // Pass userRole to OurWildlife
    />
    <ConservationEfforts />
    <CTA />
    <Footer />
  </>
);

// Main App
const App = () => {
  const [experiences, setExperiences] = useState(defaultSafariExperiences);
  const [wildlife, setWildlife] = useState(defaultWildlife);
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "guest");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const addExperience = (newExperience) => {
    setExperiences([...experiences, { id: Date.now(), ...newExperience }]);
  };

  const updateExperience = (id, updatedExperience) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, ...updatedExperience } : exp))
    );
  };

  const deleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addWildlife = (newWildlife) => {
    setWildlife([...wildlife, { id: Date.now(), ...newWildlife }]);
  };

  const updateWildlife = (id, updatedWildlife) => {
    setWildlife(
      wildlife.map((animal) =>
        animal.id === id ? { ...animal, ...updatedWildlife } : animal
      )
    );
  };

  const deleteWildlife = (id) => {
    setWildlife(wildlife.filter((animal) => animal.id !== id));
  };

  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole("guest");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          experiences={experiences}
          wildlife={wildlife}
          onAddExperience={addExperience}
          onUpdateExperience={updateExperience}
          onDeleteExperience={deleteExperience}
          onAddWildlife={addWildlife}
          onUpdateWildlife={updateWildlife}
          onDeleteWildlife={deleteWildlife}
          userRole={userRole}
        />
      ),
    },
    {
      path: "/experience/:id",
      element: <ExperienceDetails experiences={experiences} />,
    },
    {
      path: "/admin",
      element: (
        <AdminPanel
          experiences={experiences}
          onAddExperience={addExperience}
          onUpdateExperience={updateExperience}
          onDeleteExperience={deleteExperience}
          wildlife={wildlife}
          onAddWildlife={addWildlife}
          onUpdateWildlife={updateWildlife}
          onDeleteWildlife={deleteWildlife}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <button onClick={() => handleLogin("admin")}>Login as Admin</button>
          <button onClick={() => handleLogin("user")}>Login as User</button>
        </div>
      ),
    },
    {
      path: "/signup",
      element: <div>Signup Page (Implement later)</div>,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
