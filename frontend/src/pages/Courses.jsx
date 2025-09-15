import React, { useState, useEffect } from 'react';
import { getCourses, purchaseCourse } from '../services/api';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    
    fetchCourses();
  }, [user, navigate]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(error.response?.data?.message || 'Failed to load courses. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (courseId) => {
    try {
      await purchaseCourse(courseId);
      alert('Course purchased successfully!');
      // Refresh the courses list
      fetchCourses();
    } catch (error) {
      alert('Purchase failed: ' + (error.response?.data?.message || 'Please try again.'));
    }
  };

  if (!user) {
    return (
      <div className="courses-page full-width">
        <div className="container">
          <div className="loading">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="courses-page full-width">
        <div className="container">
          <h1>Available Courses</h1>
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page full-width">
        <div className="container">
          <h1>Available Courses</h1>
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchCourses} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page full-width">
      <div className="container">
        <h1>Available Courses</h1>
        <div className="courses-stats">
          <p>Showing {courses.length} courses</p>
        </div>
        
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              onPurchase={handlePurchase}
              isPurchased={user.purchasedCourses?.includes(course._id)}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="empty-state">
            <h2>No courses available</h2>
            <p>Check back later for new courses!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;