import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseRole.css';

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="choose-role-container">
      <h2>Select Your Role</h2>
      <div className="role-options">
        <button onClick={() => navigate('/signup/visitor')}>Visitor</button>
        <button onClick={() => navigate('/signup/shareholder')}>Shareholder</button>
        <button onClick={() => navigate('/signup/admin')}>Admin</button>
      </div>
    </div>
  );
};

export default ChooseRole;
