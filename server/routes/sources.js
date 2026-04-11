const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Source = require('../models/Source');
const Project = require('../models/Project');
const protect = require('../middleware/auth');

router.use(protect);

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.docx', '.txt', '.md', '.json'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Allowed: PDF, DOCX, TXT, MD, JSON'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// @route   GET /api/sources?projectId=
// @desc    Get sources for a project
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ success: false, error: 'projectId is required' });
    }

    // Verify project belongs to user
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const sources = await Source.find({ project: projectId }).sort({ createdAt: -1 });
    res.json({ success: true, count: sources.length, data: sources });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/sources
// @desc    Add a URL/API/notion/github/sitemap source
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { projectId, type, name, url } = req.body;

    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const source = await Source.create({
      project: projectId,
      type: type || 'url',
      name: name || url,
      url
    });

    res.status(201).json({ success: true, data: source });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/sources/upload
// @desc    Upload file source
// @access  Private
router.post('/upload', upload.array('files', 10), async (req, res, next) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const sources = [];
    for (const file of req.files) {
      const source = await Source.create({
        project: projectId,
        type: 'file',
        name: file.originalname,
        filePath: file.path,
        fileSize: formatBytes(file.size),
        status: 'ready'
      });
      sources.push(source);
    }

    res.status(201).json({ success: true, count: sources.length, data: sources });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/sources/:id
// @desc    Delete a source
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const source = await Source.findById(req.params.id);
    if (!source) {
      return res.status(404).json({ success: false, error: 'Source not found' });
    }

    await source.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

module.exports = router;
