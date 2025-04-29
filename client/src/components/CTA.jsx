import React from "react";

const CTA = () => {
  return (
    <section
      className="relative bg-cover bg-center py-24 text-center text-white"
      style={{ backgroundImage: "url('/background-mara-ripoi.jpg')" }} // Ensure the image is in the public folder
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold">Join Us in Protecting African Wildlife</h2>
        <p className="mt-4 text-lg">
          Your visit helps fund our conservation efforts and supports local communities.
        </p>
        <a
          href="/book"
          className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Plan Your Visit Today
        </a>
      </div>
    </section>
  );
};

export default CTA;
