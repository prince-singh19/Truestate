// backend/src/index.js (MODIFIED)

require('dotenv').config();
// 🚨 Import the app handler from the serverless file 🚨
const app = require('../api'); 
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 1. Connect to MongoDB (local persistence)
        await connectDB();
        
        // 2. Start the local server listener
        app.listen(PORT, () => {
            console.log(`Server is running locally on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Local Server Failed to Start:", error.message);
        process.exit(1);
    }
}

startServer();

