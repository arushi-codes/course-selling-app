const express = require('express');
const { 
  userSignup, 
  userLogin, 
  getAvailableCourses, 
  purchaseCourse, 
  getPurchasedCourses 
} = require('../controllers/userController');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/courses', authenticateJwt, getAvailableCourses);
router.post('/courses/:courseId', authenticateJwt, purchaseCourse);
router.get('/purchasedCourses', authenticateJwt, getPurchasedCourses);

module.exports = router;