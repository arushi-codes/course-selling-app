const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// ✅ CORRECT IMPORT FOR models/index.js
const { Admin } = require('./models');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// ✅ ADD DEFAULT ADMIN CREATION HERE (after DB connection)
const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'arushi' });
    
    if (!existingAdmin) {
      // Create the default admin
      const admin = new Admin({
        username: 'arushi',
        password: 'arushi123'
      });
      await admin.save();
      console.log('✅ Default admin created: arushi / arushi123');
    } else {
      console.log('ℹ️ Admin "arushi" already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

// Wait a bit for DB connection then create admin
setTimeout(createDefaultAdmin, 2000);

// Middleware - Updated CORS for deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Handle preflight requests
app.options('*', cors());

// Routes
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// ✅ HEALTH CHECK ROUTE
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ ONLY ONE 404 HANDLER AT THE VERY END (CORRECT PLACEMENT)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;