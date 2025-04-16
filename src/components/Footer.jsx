import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            🐾 Mara Ripoi
          </h3>
          <p className="mt-2">
            Experience the magic of African wildlife while contributing to its conservation.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Safari Packages</a></li>
            <li><a href="#" className="hover:text-white">Conservation</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Contact</h3>
          <ul className="mt-2 space-y-2">
            <li>📞 +254 700 000000</li>
            <li>📧 info@mararipoi.com</li>
            <li>📍 Narok County, Kenya</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        © 2025 Mara Ripoi Wildlife Conservancy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
