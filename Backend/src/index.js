// ES module imports
import 'dotenv/config'; // loads .env
import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectDB();
  app.use('/api/sales', salesRoutes);
  app.get('/', (req, res) => {
    res.send('Retail Sales Management System Backend is running with MongoDB.');
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

export default app;
