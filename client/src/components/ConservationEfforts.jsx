import React from "react";

const conservationData = [
  {
    title: "Anti-Poaching Units",
    description: "Dedicated teams protect wildlife through surveillance and enforcement.",
    icon: "🦁", // You can replace this with an actual image or icon component
  },
  {
    title: "Habitat Restoration",
    description: "Efforts to restore degraded ecosystems and ensure sustainable wildlife habitats.",
    icon: "🌿",
  },
  {
    title: "Community Programs",
    description: "Engaging local communities to promote conservation through education.",
    icon: "🏡",
  },
];

const ConservationEfforts = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Conservation Efforts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {conservationData.map((effort, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-left">
            <div className="text-4xl mb-4">{effort.icon}</div>
            <h3 className="text-xl font-semibold">{effort.title}</h3>
            <p className="text-gray-600 mt-2">{effort.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConservationEfforts;
