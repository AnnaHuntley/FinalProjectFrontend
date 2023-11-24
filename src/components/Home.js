import React from 'react';
import { Link } from 'react-router-dom';
import MyCalendar from './MyCalendar';


function Home() {
  return (
    <div className="home-container">
     

      <div className="home-content">
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
    Memory App is a digital platform designed to help you capture and relive your most cherished life moments. Our mission is to provide you with a seamless and enjoyable way to store your memories, create a bucket list for motivation, and keep track of your personal achievements.
  </p>
  <p>
    With Memory App, you can easily organize and revisit the special moments that make up the tapestry of your life. Whether it's a memorable vacation, a significant milestone, or a simple joy, we believe every moment is worth preserving.
  </p>
  <p>
    Features like storing memories, creating a bucket list, and tracking achievements empower you to curate your life story in a way that's meaningful to you. The intuitive interface and user-friendly design make it easy for you to navigate and interact with the app effortlessly.
  </p>
  <p>
    Join us on this journey of preserving and celebrating life's beautiful moments. Start your Memory App experience today and turn ordinary moments into extraordinary memories.
  </p>
  {/* You can add more content or customize it further */}
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

        {/* Your existing page content */}
        <MyCalendar />
      </div>

     
    </div>
  );
}

export default Home;
