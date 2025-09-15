// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Learn from the best courses</h1>
            <p>Discover thousands of courses taught by industry experts.</p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
              <Link to="/signup" className="btn btn-secondary">Start Learning</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Online Learning" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Learn with Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">📚</div>
              <h3>Expert Content</h3>
              <p>Courses created by industry professionals with real-world experience.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💻</div>
              <h3>Learn Anywhere</h3>
              <p>Access your courses on any device, at any time.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎓</div>
              <h3>Certificates</h3>
              <p>Earn certificates to showcase your new skills.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;