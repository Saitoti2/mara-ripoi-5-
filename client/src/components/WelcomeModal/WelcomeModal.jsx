import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeModal.css';

const WelcomeModal = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop">
        <h2>Welcome to Mara Ripoi!</h2>
        <p>Are you new or returning?</p>
        <div className="btn-group">
          <button onClick={() => navigate('/choose-role')}>Register</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
