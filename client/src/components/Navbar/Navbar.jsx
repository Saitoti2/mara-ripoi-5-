import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../images/paw-logo.png"; // Corrected path to the image

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        
        {/* Logo */}
        <div className="logo-container animate-pop">
          <img src={logo} alt="Mara Ripoi Logo" className="logo" />
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li onClick={() => toggleSubmenu("about")}>
            About
            <ul className={`sub-links ${openMenu === "about" ? "open" : ""}`}>
              <li>Our Story</li>
              <li>Mission</li>
            </ul>
          </li>

          <li onClick={() => toggleSubmenu("safaris")}>
            Safaris
            <ul className={`sub-links ${openMenu === "safaris" ? "open" : ""}`}>
              <li>Wildlife Tours</li>
              <li>Photography</li>
            </ul>
          </li>

          <li onClick={() => toggleSubmenu("contact")}>
            Contact
            <ul className={`sub-links ${openMenu === "contact" ? "open" : ""}`}>
              <li>Email</li>
              <li>Visit Us</li>
            </ul>
          </li>
        </ul>

        {/* Site Title */}
        <div className={`site-title animate-pop ${scrolled ? "text-dark" : ""}`}>
           <strong>Mara Ripoi Conservancy</strong>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
