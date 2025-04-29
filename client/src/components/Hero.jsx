import React from "react";

// Import the background image
import backgroundImage from "../images/background-mara-ripoi.jpg";

const Hero = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center bg-fixed pt-28"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image here
        backgroundPosition: "center 40%",
      }}
    >
      {/* Gradient shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight animate-fadeInDown">
          Experience Wild Africa at Its Finest
        </h1>

        <p className="text-white text-lg md:text-xl mt-6 max-w-2xl animate-fadeInUp">
          Discover the untamed beauty of Mara Ripoi Wildlife Conservancy, where nature, culture, and conservation unite.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeInUp">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            Plan Your Safari
          </button>
          <button className="bg-white hover:bg-gray-200 text-black font-semibold px-8 py-3 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
