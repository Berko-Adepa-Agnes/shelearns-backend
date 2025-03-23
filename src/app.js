import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import careerRoutes from './controllers/career.js';
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

// Routes
app.use('/api/careers', careerRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to SheLearns API - Empowering Women in Tech!');
});

export default app;
