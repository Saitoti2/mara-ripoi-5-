import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    parcelNumber: '',
    profilePicture: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

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
    if (!formData.parcelNumber) newErrors.parcelNumber = 'Parcel Number is required';
    if (!formData.profilePicture) newErrors.profilePicture = 'Profile Picture is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Prepare form data for submission
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('parcelNumber', formData.parcelNumber);
      data.append('profilePicture', formData.profilePicture);

      // Submit the form data to the backend
      // Example: axios.post('/api/signup', data)
      console.log('Form submitted');
    }
  };

  return (
    <div className="signup-container">
      <h2>Shareholder Signup</h2>
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
          Parcel Number:
          <input
            type="text"
            name="parcelNumber"
            value={formData.parcelNumber}
            onChange={handleChange}
          />
          {errors.parcelNumber && <span className="error">{errors.parcelNumber}</span>}
        </label>

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
