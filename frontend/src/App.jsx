// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  // ← MOVE ProtectedRoute INSIDE the App component
  const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useAuth();
    
    // If user not logged in, redirect to login
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    // If admin required but user is not admin, redirect to dashboard
    if (requireAdmin && !user.isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
    
    // Otherwise, show the protected page
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;