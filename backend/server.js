const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');
const SiteContent = require('./models/SiteContent');
const errorHandler = require('./middleware/errorHandler');
const sendResponse = require('./utils/responseHandler');

// Import Modular Routers
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// -- MOUNT ROUTERS --
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);

// Legacy `/api/content` routes for backward compatibility
app.get('/api/content', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/content', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent();
    }
    Object.assign(content, req.body);
    await content.save();
    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// File Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 400, error: 'No file uploaded', success: false });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  sendResponse(res, 200, 'File uploaded successfully', { url: imageUrl });
});

// Global Centralized Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
