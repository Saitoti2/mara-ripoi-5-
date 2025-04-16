import React from "react";

const Stats = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-3xl font-bold text-orange-600">150,000</h3>
            <p className="text-gray-600">Acres Protected</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-600">500+</h3>
            <p className="text-gray-600">Species Protected</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-600">1,000+</h3>
            <p className="text-gray-600">Local Community Members</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-600">25+</h3>
            <p className="text-gray-600">Years of Conservation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
