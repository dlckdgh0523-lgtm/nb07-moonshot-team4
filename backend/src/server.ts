import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// middleware
app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.send('🚀 Moonshot backend is running');
});

// server start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});