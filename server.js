import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import stateRoutes from './routes/stateRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.get('/api/health', (_req, res) => res.json({ success: true, service: 'Campus Connect API', status: 'running' }));
app.use('/api/state', stateRoutes);
app.use('/api/events', eventRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` }));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ success: false, message: 'Internal server error.' }); });

const port = Number(process.env.PORT) || 5000;
try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_connect');
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Campus Connect API listening on http://localhost:${port}`));
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
}
