import express from 'express';
import Career from '../models/career.js';
import puppeteerService from '../utilities/puppeteer.js';

const router = express.Router();

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Search careers by keyword
router.get('/search', async (req, res) => {
  try {
    const { keyword = '' } = req.query;
    const regex = new RegExp(keyword, 'i');
    console.log(`Searching careers with keyword: ${keyword}`);
    const careers = await Career.find({ name: { $regex: regex } });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    console.error('Error searching careers:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get a single career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id).populate('roadmap');
    if (!career) {
      return res
        .status(404)
        .json({ success: false, error: 'Career not found' });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    console.error('Error fetching career:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Generate roadmap PDF
router.get('/:id/roadmap', async (req, res) => {
  try {
    // Find career with roadmap
    const career = await Career.findById(req.params.id).populate('roadmap');
    if (!career) {
      return res
        .status(404)
        .json({ success: false, error: 'Career not found' });
    }
    if (!career.roadmap) {
      return res
        .status(404)
        .json({ success: false, error: 'Roadmap not found for this career' });
    }
    console.log(`Generating roadmap for ${career.name}...`);
    // Generate PDF
    const base64 = await puppeteerService.generatePDF(career, career.roadmap);
    res.status(200).json({ success: true, data: base64 });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Cleanup puppeteer when server shuts down
process.on('SIGINT', async (...args) => {
  await puppeteerService.close();
  process.exit(0);
});

process.on('SIGTERM', async (...args) => {
  await puppeteerService.close();
  process.exit(0);
});

export default router;
