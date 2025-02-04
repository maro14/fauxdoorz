import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';
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
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
      } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
      }
    }))(req, res);
  }

}
