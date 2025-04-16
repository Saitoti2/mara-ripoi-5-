import React from "react";

const Hero = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/safari-hero.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-white text-5xl md:text-6xl font-bold">
          Experience Wild Africa at Its Finest
        </h1>
        <p className="text-white text-lg mt-4 max-w-2xl">
          Discover the untamed beauty of Mara Ripoi Wildlife Conservancy, where nature, culture, and conservation unite.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600">
            Plan Your Safari
          </button>
          <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
