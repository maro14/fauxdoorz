import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxLength: [2000, 'Description cannot be more than 2000 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true,
    index: true
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  amenities: [{
    type: String,
    enum: ['wifi', 'parking', 'pool', 'gym', 'ac', 'kitchen', 'tv', 'washer']
  }],
  bedrooms: {
    type: Number,
    required: [true, 'Please specify number of bedrooms'],
    min: [1, 'Must have at least 1 bedroom']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please specify number of bathrooms'],
    min: [1, 'Must have at least 1 bathroom']
  },
  maxGuests: {
    type: Number,
    required: [true, 'Please specify maximum number of guests'],
    min: [1, 'Must accommodate at least 1 guest']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
PropertySchema.index({ owner: 1 });
PropertySchema.index({ pricePerNight: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ rating: -1 });

// Update the updatedAt field on save
PropertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
