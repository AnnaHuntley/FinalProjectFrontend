import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Logo.png';
import '../App.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  const toggleNavbar = (e) => {
    e.stopPropagation(); // Stop the click event from reaching the document
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <Link to="/">
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/memories">Memories</Link>
          </li>
          <li>
            <Link to="/bucket_lists">Bucket List</Link>
          </li>
          <li>
            <Link to="/achievements">Achievements</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        {/* Footer Section */}
        <footer className="app-footer">
          <div className="contact-info">
            <p>Contact Us: support@memoryapp.com</p>
          </div>
          <div className="legal-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
      <div className="content">
        {/* Your existing page content */}
      </div>
      <button className="navbar-toggle" onClick={(e) => toggleNavbar(e)}>
        <img src={logo} alt="Logo" className="navbar-logo" />
      </button>
    </>
  );
}

export default Navbar;
