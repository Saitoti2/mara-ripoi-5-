import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import SafariExperiences from './components/SafariExperience/SafariExperiences.jsx';
import OurWildlife from './components/OurWildlife.jsx';
import WildlifeForm from './components/WildlifeForm.jsx'; // ✅ NEW: Admin-only form
import ConservationEfforts from './components/ConservationEfforts.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import ExperienceDetails from './components/ExperienceDetails.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';

// Auth
import Login from './components/ShareholderLogin/Login.jsx';
import Signup from './components/ShareholderSignup/Signup.jsx';
import ChooseRole from './components/ChooseRole/ChooseRole.jsx';

// API instance
import api from './api/api'; // Axios instance

const Layout = ({ userRole }) => {
  const location = useLocation();
  const hideNavRoutes = ['/login', '/signup'];
  const isAuthRoute = hideNavRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Outlet />
      {!isAuthRoute && <Footer />}
    </>
  );
};

const Home = ({
  experiences,
  wildlife,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
  onAddWildlife,
  onUpdateWildlife,
  onDeleteWildlife,
  userRole,
}) => (
  <>
    <Hero />
    <Stats />
    <SafariExperiences
      experiences={experiences}
      onAdd={onAddExperience}
      onUpdate={onUpdateExperience}
      onDelete={onDeleteExperience}
      userRole={userRole}
    />
    <OurWildlife
      wildlife={wildlife}
      onAdd={onAddWildlife}
      onUpdate={onUpdateWildlife}
      onDelete={onDeleteWildlife}
      userRole={userRole}
    />
    {userRole === 'admin' && <WildlifeForm />} {/* ✅ Admins can upload wildlife */}
    <ConservationEfforts />
    <CTA />
  </>
);

const App = () => {
  const [experiences, setExperiences] = useState([]);
  const [wildlife, setWildlife] = useState([]);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) setUserRole(storedRole);

    fetchExperiences();
    fetchWildlife();
  }, []);

  // Fetch Experiences
  const fetchExperiences = async () => {
    try {
      const response = await api.get('/safari-experiences/');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  // Fetch Wildlife
  const fetchWildlife = async () => {
    try {
      const response = await api.get('/wildlife/list/'); // ✅ Use correct endpoint
      setWildlife(response.data);
    } catch (error) {
      console.error('Error fetching wildlife:', error);
    }
  };

  // CRUD: Experiences
  const addExperience = async (newExperience) => {
    try {
      const response = await api.post('/safari-experiences/', newExperience);
      setExperiences((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const updateExperience = async (id, updatedData) => {
    try {
      const response = await api.put(`/safari-experiences/${id}/`, updatedData);
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === id ? response.data : exp))
      );
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await api.delete(`/safari-experiences/${id}/`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  // CRUD: Wildlife
  const addWildlife = async (newWildlife) => {
    try {
      const response = await api.post('/wildlife/create/', newWildlife); // ✅ Correct path
      setWildlife((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding wildlife:', error);
    }
  };

  const updateWildlife = async (id, updatedData) => {
    try {
      const response = await api.put(`/wildlife/${id}/`, updatedData);
      setWildlife((prev) =>
        prev.map((animal) => (animal.id === id ? response.data : animal))
      );
    } catch (error) {
      console.error('Error updating wildlife:', error);
    }
  };

  const deleteWildlife = async (id) => {
    try {
      await api.delete(`/wildlife/${id}/`);
      setWildlife((prev) => prev.filter((animal) => animal.id !== id));
    } catch (error) {
      console.error('Error deleting wildlife:', error);
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout userRole={userRole} />,
      children: [
        {
          index: true,
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
          path: 'experience/:id',
          element: <ExperienceDetails experiences={experiences} />,
        },
        {
          path: 'admin',
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
              userRole={userRole} // ✅ You can use this in AdminPanel too
            />
          ),
        },
        {
          path: 'choose-role',
          element: <ChooseRole />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup/:role',
      element: <Signup />,
    },
    {
      path: '*',
      element: <div>404 - Page Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
