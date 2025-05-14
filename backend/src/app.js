const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const newsRouter = require('./routes/news.routes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'web-crawler-git-main-desnes-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Si usas autenticación

}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/news', newsRouter);

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;