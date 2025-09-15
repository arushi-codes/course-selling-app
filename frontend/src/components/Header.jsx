// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h2>CourseHub</h2>
        </Link>
        
        <nav className="nav">
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;