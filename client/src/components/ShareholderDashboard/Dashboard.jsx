import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [shareholderData, setShareholderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch shareholder data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/shareholder/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shareholder data');
        }

        const data = await response.json();
        setShareholderData(data);
      } catch (error) {
        console.error('Error fetching shareholder data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (!shareholderData) {
    return <div className="dashboard-container">No data available.</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Shareholder Dashboard</h2>
      <div className="profile-section">
        <img
          src={shareholderData.profilePictureUrl}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> {shareholderData.fullName}</p>
          <p><strong>Email:</strong> {shareholderData.email}</p>
          <p><strong>Parcel Number:</strong> {shareholderData.parcelNumber}</p>
        </div>
      </div>

      <div className="history-section">
        <h3>Lease History</h3>
        <ul>
          {shareholderData.leaseHistory.map((lease, index) => (
            <li key={index}>
              Start Date: {lease.startDate} | End Date: {lease.endDate}
            </li>
          ))}
        </ul>
      </div>

      <div className="history-section">
        <h3>Payment History</h3>
        <ul>
          {shareholderData.paymentHistory.map((payment, index) => (
            <li key={index}>
              Date: {payment.date} | Amount: {payment.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
