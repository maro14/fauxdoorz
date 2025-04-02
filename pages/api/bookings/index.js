import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';
import Property from '../../../models/Property';
import User from '../../../models/User';
import authMiddleware from '../../../middlewares/authMiddleware';
import adminMiddleware from '../../../middlewares/adminMiddleware';
import validateBookingData from '../../../middlewares/validateBookingData';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Only admin users can fetch all bookings
    authMiddleware(adminMiddleware(async (req, res) => {
      try {
        const bookings = await Booking.find({}).populate('property user');
        res.status(200).json(bookings);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
      }
    }))(req, res);
  } 

  if (req.method === 'POST') {
    // Only authenticated users can create bookings
    authMiddleware(validateBookingData(async (req, res) => {
      try {
        const { property: propertyId, startDate, endDate, totalPrice, guestCount, specialRequests } = req.body;
        
        // Check if property exists
        const property = await Property.findById(propertyId);
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
        
        // Check if property is available for the requested dates
        const conflictingBooking = await Booking.findOne({
          property: propertyId,
          status: { $in: ['pending', 'confirmed'] },
          $or: [
            // Check if the new booking overlaps with existing bookings
            {
              startDate: { $lte: new Date(endDate) },
              endDate: { $gte: new Date(startDate) }
            }
          ]
        });
        
        if (conflictingBooking) {
          return res.status(400).json({ 
            message: 'Property is not available for the selected dates',
            conflictingBooking
          });
        }
        
        // Check if guest count is valid
        if (guestCount > property.maxGuests) {
          return res.status(400).json({ 
            message: `This property can only accommodate up to ${property.maxGuests} guests` 
          });
        }
        
        // Create the booking
        const newBooking = new Booking({
          property: propertyId,
          user: req.user._id, // Use the authenticated user's ID
          startDate,
          endDate,
          totalPrice,
          guestCount: guestCount || 1,
          specialRequests,
          status: 'pending'
        });
        
        await newBooking.save();
        
        // Add booking reference to user's bookings
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { bookings: newBooking._id } }
        );
        
        // Return the booking with populated property data
        const populatedBooking = await Booking.findById(newBooking._id)
          .populate('property');
        
        res.status(201).json({
          message: 'Booking created successfully',
          booking: populatedBooking
        });
      } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({ 
          message: 'Error creating booking',
          error: error.message 
        });
      }
    }))(req, res);
  }
}
