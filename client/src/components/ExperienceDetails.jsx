import React from "react";
import { useParams } from "react-router-dom";

const ExperienceDetails = ({ experiences }) => {
  const { id } = useParams();
  const experience = experiences.find((exp) => exp.id === parseInt(id));

  if (!experience) {
    return <p className="text-center py-16 text-xl">Experience not found.</p>;
  }

  return (
    <section className="py-16 bg-white max-w-4xl mx-auto">
      <img src={experience.image} alt={experience.title} className="w-full h-80 object-cover rounded-lg mb-6" />
      <h2 className="text-3xl font-bold mb-4">{experience.title}</h2>
      <p className="text-gray-700 mb-4">{experience.description}</p>
      <div className="flex items-center justify-between text-lg">
        <span className="text-orange-600 font-semibold">{experience.price}</span>
        <span className="text-yellow-500">⭐ {experience.rating}</span>
      </div>
    </section>
  );
};

export default ExperienceDetails;
