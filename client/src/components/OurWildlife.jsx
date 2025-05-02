import React, { useEffect, useState } from "react";
import axios from "axios";

const OurWildlife = () => {
  const [wildlifeData, setWildlifeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/wildlife/list/")
      .then((response) => {
        setWildlifeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wildlife data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Wildlife</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {wildlifeData.map((animal, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{animal.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OurWildlife;
