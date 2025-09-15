const express = require('express');
const { 
  adminSignup, 
  adminLogin, 
  createCourse, 
  updateCourse, 
  getCourses 
} = require('../controllers/adminController');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/courses', authenticateJwt, createCourse);
router.put('/courses/:courseId', authenticateJwt, updateCourse);
router.get('/courses', authenticateJwt, getCourses);

module.exports = router;