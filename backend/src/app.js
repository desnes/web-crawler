const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;