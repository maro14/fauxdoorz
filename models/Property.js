import mongoose from 'mongoose';
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
