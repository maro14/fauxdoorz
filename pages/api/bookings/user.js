import dbConnect from '../../../utils/dbConnect';
import Booking from '../../../models/Booking';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    return authMiddleware(async (req, res) => {
      try {
        // Get query parameters for filtering
        const { status } = req.query;
        
        // Build filter object
        const filter = { user: req.user._id };
        
        // Add status filter if provided
        if (status && ['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
          filter.status = status;
        }
        
        // Fetch user's bookings with populated property data
        const bookings = await Booking.find(filter)
          .populate({
            path: 'property',
            select: 'title location images pricePerNight'
          })
          .sort({ createdAt: -1 }); // Most recent first
        
        res.status(200).json(bookings);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
      }
    })(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}