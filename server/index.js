import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import newsRoutes from './routes/newsRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/businessNewsInsights', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// API Routes
app.use('/api/news', newsRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root Endpoint (optional)
app.get('/', (req, res) => {
  res.send(' Business News Insights API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});

// Global Error Handling (optional)
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Optionally: process.exit(1);
});
