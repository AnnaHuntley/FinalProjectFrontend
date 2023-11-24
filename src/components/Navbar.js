import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Logo.png';
import '../App.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        {/* Your existing logo and links */}
        <Link to="/">
        { /* <img src={logo} alt="Logo" className="navbar-logo" />*/}
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
      <button className="navbar-toggle" onClick={toggleNavbar}>
  <img src={logo} alt="Logo" className="navbar-logo" />
</button>

    </>
  );
}

export default Navbar;
