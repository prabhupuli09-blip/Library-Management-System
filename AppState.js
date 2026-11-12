import mongoose from 'mongoose';

const appStateSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, enum: ['viewMode', 'currentRole', 'events', 'registrations', 'certificates', 'clubs', 'notifications', 'feedbacks'] },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

export default mongoose.model('AppState', appStateSchema);
