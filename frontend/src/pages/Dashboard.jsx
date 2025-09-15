import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPurchasedCourses } from '../services/api';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      const response = await getPurchasedCourses();
      setPurchasedCourses(response.data.purchasedCourses);
    } catch (error) {
      setError('Failed to load purchased courses');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading your courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-page full-width">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.username}! 👋</h1>
          <p>Continue your learning journey</p>
        </div>

        <div className="dashboard-content">
          <div className="courses-section">
            <h2>Your Purchased Courses ({purchasedCourses.length})</h2>
            
            {purchasedCourses.length === 0 ? (
              <div className="empty-state">
                <h3>No courses purchased yet</h3>
                <p>Browse our courses and start learning today!</p>
                <a href="/courses" className="btn btn-primary">
                  Browse Courses
                </a>
              </div>
            ) : (
              <div className="courses-grid">
                {purchasedCourses.map(course => (
                  <CourseCard 
                    key={course._id} 
                    course={course} 
                    isPurchased={true}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-sidebar">
            <div className="stats-card">
              <h3>Learning Stats</h3>
              <div className="stat-item">
                <span className="stat-number">{purchasedCourses.length}</span>
                <span className="stat-label">Courses Enrolled</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Courses Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;