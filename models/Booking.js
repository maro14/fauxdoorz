import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date for the booking'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date for the booking'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide the total price for the booking'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  guestCount: {
    type: Number,
    required: [true, 'Please provide the number of guests'],
    min: [1, 'At least one guest is required'],
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
