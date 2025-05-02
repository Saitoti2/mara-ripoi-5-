import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/destinations/')
      .then(response => {
        setDestinations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading destinations...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Safari Destinations</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {destinations.map(dest => (
          <div
            key={dest.id}
            className="bg-white p-4 shadow rounded-xl border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{dest.name}</h2>
            <p className="text-sm text-gray-600">{dest.location}</p>
            <p className="text-md mt-2 text-green-600 font-medium">Ksh {dest.price}</p>
            <p className="text-gray-700 mt-1">{dest.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
