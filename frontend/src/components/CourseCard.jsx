import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, onPurchase, isPurchased = false }) => {
  return (
    <div className="course-card"> {/* ← course-card CLASS */}
      <div className="course-image"> {/* ← course-image CLASS */}
        <img 
          src={course.imageLink || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8'} 
          alt={course.title} 
        />
        {isPurchased && (
          <div className="purchased-badge">Purchased ✓</div>
        )}
      </div>
      <div className="course-content"> {/* ← course-content CLASS */}
        <h3>{course.title}</h3>
        <p className="course-description"> {/* ← course-description CLASS */}
          {course.description?.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description
          }
        </p>
        <div className="course-meta"> {/* ← course-meta CLASS */}
          <span className="course-price">${course.price}</span> {/* ← course-price CLASS */}
          <span className={`course-status ${course.published ? 'published' : 'draft'}`}>
            {course.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="course-actions"> {/* ← course-actions CLASS */}
          <Link to={`/course/${course._id}`} className="btn btn-primary">
            View Details
          </Link>
          {course.published && !isPurchased && (
            <button 
              className="btn btn-secondary"
              onClick={() => onPurchase(course._id)}
            >
              Enroll Now
            </button>
          )}
          {isPurchased && (
            <span className="purchased-text">Already Enrolled</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;