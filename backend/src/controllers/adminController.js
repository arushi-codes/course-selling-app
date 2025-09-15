const jwt = require('jsonwebtoken');
const { Admin, Course } = require('../models');
const { SECRET } = require('../middleware/auth');

const adminSignup = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(403).json({ message: 'Admin already exists' });
    }
    
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const adminLogin = async (req, res) => {
  // Get credentials from request body
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      published: true // ← ADDED: Auto-publish all new courses
    });
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { 
      new: true
    });
    
    if (course) {
      res.json({ message: 'Course updated successfully', course });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  createCourse,
  updateCourse,
  getCourses
};