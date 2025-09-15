const jwt = require('jsonwebtoken');
const { User, Course } = require('../models');
const { SECRET } = require('../middleware/auth');

const userSignup = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }
    
    const newUser = new User({ username, password });
    await newUser.save();
    
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('User signup error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const userLogin = async (req, res) => {
  // Get credentials from headers (original implementation)
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }
    
    if (user.purchasedCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Course already purchased' });
    }
    
    user.purchasedCourses.push(course);
    await user.save();
    
    res.json({ message: 'Course purchased successfully' });
  } catch (error) {
    console.error('Error purchasing course:', error);
    res.status(500).json({ message: 'Error purchasing course', error: error.message });
  }
};

const getPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ message: 'Error fetching purchased courses', error: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
  getAvailableCourses,
  purchaseCourse,
  getPurchasedCourses
};