// frontend/src/pages/CourseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <h1>Course Details - ID: {id}</h1>
      <p>This page will show detailed information about the course.</p>
    </div>
  );
};

export default CourseDetail;