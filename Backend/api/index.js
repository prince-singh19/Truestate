// backend/api/index.js (NEW FILE)

const express = require('express');
const cors = require('cors');
const salesRoutes = require('../src/routes/salesRoutes'); 
const connectDB = require('../src/utils/db'); 

const app = express();

app.use(cors());
app.use(express.json());

// 🚨 Vercel Middleware: Ensure DB connection on request 🚨
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed for request:", error);
        res.status(503).send('Service Unavailable: Could not connect to the database.');
    }
});

// Routes
app.use('/api/sales', salesRoutes);
app.get('/', (req, res) => {
    res.send('Retail Sales Management System Backend is running on Vercel.');
});

// 🚨 CRITICAL: Export the app instance for Vercel to use 🚨
module.exports = app;