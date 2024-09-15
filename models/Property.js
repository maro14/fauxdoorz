import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide the title of the property'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the property'],
  },
  location: {
    type: String,
    required: [true, 'Please provide the location of the property'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price per night'],
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the property
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster search by location
PropertySchema.index({ location: 'text' });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
