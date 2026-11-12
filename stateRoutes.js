import { Router } from 'express';
import AppState from '../models/AppState.js';

const router = Router();
const allowedKeys = new Set(['viewMode', 'currentRole', 'events', 'registrations', 'certificates', 'clubs', 'notifications', 'feedbacks']);

router.get('/', async (_req, res, next) => {
  try {
    const records = await AppState.find().lean();
    const state = Object.fromEntries(records.map((record) => [record.key, record.value]));
    res.json({ success: true, state });
  } catch (error) { next(error); }
});

router.put('/:key', async (req, res, next) => {
  try {
    const { key } = req.params;
    if (!allowedKeys.has(key)) return res.status(400).json({ success: false, message: 'Invalid state key.' });
    if (!Object.prototype.hasOwnProperty.call(req.body, 'value')) return res.status(400).json({ success: false, message: 'value is required.' });
    const record = await AppState.findOneAndUpdate({ key }, { $set: { value: req.body.value } }, { upsert: true, new: true, runValidators: true });
    res.json({ success: true, key: record.key, value: record.value });
  } catch (error) { next(error); }
});

router.delete('/', async (_req, res, next) => {
  try { await AppState.deleteMany({}); res.json({ success: true, message: 'Application state cleared.' }); }
  catch (error) { next(error); }
});
export default router;
