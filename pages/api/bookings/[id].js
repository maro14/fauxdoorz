import dbConnect from '../../../lib/dbConnect';
import Booking from '../../../models/Booking';
import authMiddleware from '../../../middlewares/authMiddleware';
import validateBookingData from '../../../middlewares/validateBookingData';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    // Only the user who made the booking or an admin can view the booking
    authMiddleware(async (req, res) => {
      try {
        const booking = await Booking.findById(id).populate('property user');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (req.user._id !== booking.user.toString() && !req.user.isAdmin) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        res.status(200).json(booking);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching booking' });
      }
    })(req, res);
  }

  if (req.method === 'PUT') {
    // Only the user who made the booking can update it
    authMiddleware(validateBookingData(async (req, res) => {
      try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        if (req.user._id !== updatedBooking.user.toString()) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        res.status(200).json(updatedBooking);
      } catch (error) {
        res.status(500).json({ message: 'Error updating booking' });
      }
    }))(req, res);
  }

  if (req.method === 'DELETE') {
    // Only the user who made the booking or admin can delete it
    authMiddleware(async (req, res) => {
      try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (req.user._id !== booking.user.toString() && !req.user.isAdmin) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        await booking.remove();
        res.status(200).json({ message: 'Booking deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
      }
    })(req, res);
  }
}
