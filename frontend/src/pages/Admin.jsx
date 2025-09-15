import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminCourses, createCourse, updateCourse, deleteCourse } from '../services/api';

const Admin = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageLink: '',
    published: false
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAdminCourses();
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink || '',
      published: course.published || false
    });
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(courseId);
        fetchCourses(); // Refresh the list
        alert('Course deleted successfully!');
      } catch (error) {
        alert('Error deleting course: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update existing course
        await updateCourse(editingCourse._id, formData);
        alert('Course updated successfully!');
      } else {
        // Create new course
        await createCourse(formData);
        alert('Course created successfully!');
      }
      
      // Reset form and refresh list
      setShowForm(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', price: '', imageLink: '', published: false });
      fetchCourses();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({ title: '', description: '', price: '', imageLink: '', published: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-page full-width">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin {user?.username}</p>
        </div>

        <div className="admin-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Create New Course'}
          </button>
        </div>

        {showForm && (
          <div className="course-form">
            <h2>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                  />
                  Published (visible to users)
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
            </form>
          </div>
        )}

        <div className="admin-courses">
          <h2>Manage Courses ({courses.length})</h2>
          <div className="courses-list">
            {courses.map(course => (
              <div key={course._id} className="course-item">
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="price">${course.price}</span>
                    <span className={`status ${course.published ? 'published' : 'draft'}`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="course-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;