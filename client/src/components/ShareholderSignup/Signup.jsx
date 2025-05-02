import React, { useState, useEffect } from 'react';
import './Signup.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    parcelNumber: '',
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const { role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to a default route if no role is passed
    if (!role) navigate('/choose-role');
  }, [role, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      const file = files[0];
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.parcelNumber && role === 'shareholder') newErrors.parcelNumber = 'Parcel Number is required';
    if (role !== 'visitor' && !formData.profilePicture) newErrors.profilePicture = 'Profile Picture is required';
    return newErrors;
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = new FormData();
    data.append('full_name', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (role === 'shareholder') data.append('parcel_number', formData.parcelNumber);
    if (role !== 'visitor') data.append('profile_picture', formData.profilePicture);

    let apiUrl = 'http://localhost:8000/api/';
    if (role === 'shareholder') {
      apiUrl += 'shareholders/signup/';
    } else if (role === 'admin') {
      apiUrl += 'admins/signup/'; // You'll need to create a backend endpoint for admin signup requests

    }

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Signup successful! Await admin approval.');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        parcelNumber: '',
        profilePicture: null,
      });
      setPreview(null);
      setErrors({});
      navigate(role === 'admin' ? '/admin-dashboard' : '/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Please check the console for details.');
    }
  };

  return (
    <div className="signup-container">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>

        {role === 'shareholder' && (
          <label>
            Parcel Number:
            <input
              type="text"
              name="parcelNumber"
              value={formData.parcelNumber}
              onChange={handleChange}
            />
            {errors.parcelNumber && <span className="error">{errors.parcelNumber}</span>}
          </label>
        )}

        {role !== 'visitor' && (
          <label>
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.profilePicture && <span className="error">{errors.profilePicture}</span>}
          </label>
        )}

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Profile Preview" />
          </div>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
