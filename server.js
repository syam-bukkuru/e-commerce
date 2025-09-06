require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB (async)
connectDB().catch(err => console.error(err));

// middleware
app.use(express.json());

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World — E-commerce API is up!' });
});

// health check route
app.get('/health', (req, res) => res.sendStatus(200));

// export app for testing (important)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
