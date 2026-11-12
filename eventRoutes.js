import { Router } from 'express';
import AppState from '../models/AppState.js';
const router = Router();
const getEvents = async () => (await AppState.findOne({ key: 'events' }))?.value || [];
const saveEvents = async (events) => AppState.findOneAndUpdate({ key: 'events' }, { $set: { value: events } }, { upsert: true, new: true });

router.get('/', async (_req, res, next) => { try { res.json({ success: true, events: await getEvents() }); } catch (e) { next(e); } });
router.get('/:id', async (req, res, next) => { try { const event = (await getEvents()).find((item) => String(item.id) === req.params.id); if (!event) return res.status(404).json({ message: 'Event not found.' }); res.json({ success: true, event }); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => { try { const { title, date, venue } = req.body; if (!title || !date || !venue) return res.status(400).json({ message: 'title, date and venue are required.' }); const events = await getEvents(); const event = { ...req.body, id: req.body.id || `EVT-${Date.now()}` }; events.push(event); await saveEvents(events); res.status(201).json({ success: true, event }); } catch (e) { next(e); } });
router.put('/:id', async (req, res, next) => { try { const events = await getEvents(); const index = events.findIndex((item) => String(item.id) === req.params.id); if (index < 0) return res.status(404).json({ message: 'Event not found.' }); events[index] = { ...events[index], ...req.body, id: events[index].id }; await saveEvents(events); res.json({ success: true, event: events[index] }); } catch (e) { next(e); } });
router.delete('/:id', async (req, res, next) => { try { const events = await getEvents(); const updated = events.filter((item) => String(item.id) !== req.params.id); if (updated.length === events.length) return res.status(404).json({ message: 'Event not found.' }); await saveEvents(updated); res.json({ success: true, message: 'Event deleted.' }); } catch (e) { next(e); } });
export default router;
