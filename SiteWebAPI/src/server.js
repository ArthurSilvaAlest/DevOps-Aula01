import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ name: 'SiteWebAPI', version: '0.1.0' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});