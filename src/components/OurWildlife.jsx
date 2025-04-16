import React from "react";

const wildlifeData = [
  {
    name: "Lion",
    image: "/images/lion.jpg",
  },
  {
    name: "Elephant",
    image: "/images/elephant.jpg",
  },
  {
    name: "Cheetah",
    image: "/images/cheetah.jpg",
  },
  {
    name: "Rhino",
    image: "/images/rhino.jpg",
  },
];

const OurWildlife = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Wildlife</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {wildlifeData.map((animal, index) => (
          <div key={index} className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img src={animal.image} alt={animal.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{animal.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurWildlife;
