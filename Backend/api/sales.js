// api/sales.js
import express from 'express';
import cors from 'cors';
import connectDB from '../src/utils/db.js';
import getSales from '../src/services/salesService.js';

const app = express();
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

await connectDB();

app.get('/api/sales', async (req, res) => {
  try {
    const result = await getSales(req.query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
