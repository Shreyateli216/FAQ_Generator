const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/auth');
const faqRoutes = require('./routes/faqs');
const seedRoutes = require('./routes/seed');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/seed', seedRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'FAQGenie API is running!', timestamp: new Date().toISOString() });
});

// Error handler (must be after routes)
app.use(errorHandler);

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 FAQGenie API Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌱 Seed DB: POST http://localhost:${PORT}/api/seed\n`);
});
