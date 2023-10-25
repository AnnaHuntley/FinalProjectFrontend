import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="app-header">
        <div className="logo">
          <img src="your-logo.png" alt="Memory App Logo" />
          <h1>Memory App</h1>
        </div>
        <nav className="main-menu">
          <Link to="/memories">Memories</Link>
          <Link to="/bucket_lists">Bucket List</Link>
          <Link to="/achievements">Achievements</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Preserve Your Precious Memories</h2>
        <p>Relive and cherish the moments that matter most to you.</p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h3>About Memory App</h3>
        <p>
          Memory App is a digital platform that allows you to store and relive your cherished life memories, create a bucket list for motivation, and keep track of your personal achievements.
        </p>
        {/* You can add images/icons here to illustrate the features */}
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h3>Key Features</h3>
        <ul>
          <li>Store Memories</li>
          <li>Create a Bucket List</li>
          <li>Track Achievements</li>
        </ul>
      </section>

      {/* Testimonials or Reviews (Add your own content) */}
      <section className="testimonials-section">
        <h3>What Our Users Say</h3>
        <div className="testimonial">
          <p>"I love using Memory App to capture life's special moments. It's easy and fun!"</p>
          <p className="user-name">- Sarah J.</p>
        </div>
        {/* Add more testimonials here */}
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Join Memory App Today</h2>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </section>

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
  );
}

export default Home;
