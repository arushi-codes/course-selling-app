// components/courses/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.imageLink || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
             alt={course.title} />
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <p className="course-description">
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description
          }
        </p>
        <div className="course-meta">
          <span className="course-price">${course.price}</span>
          <span className={`course-status ${course.published ? 'published' : 'draft'}`}>
            {course.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <Link to={`/course/${course._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;