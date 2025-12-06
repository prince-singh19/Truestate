require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());

async function startServer() {

    await connectDB(); 

  
    app.use('/api/sales', salesRoutes);
    app.get('/', (req, res) => {
        res.send('Retail Sales Management System Backend is running with MongoDB.');
    });

    // 3. Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
export default app;