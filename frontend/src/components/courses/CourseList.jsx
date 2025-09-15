// components/courses/CourseList.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { getCourses } from '../../services/api';

const CourseList = ({ featuredOnly = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        // In a real app, we would have a featured flag in the course model
        const filteredCourses = featuredOnly ? data.courses.slice(0, 3) : data.courses;
        setCourses(filteredCourses);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [featuredOnly]);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="course-list">
      {courses.length === 0 ? (
        <div className="no-courses">No courses available yet.</div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;