import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    return authMiddleware(async (req, res) => {
      try {
        // Find user by ID but exclude password
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data' });
      }
    })(req, res);
  } else if (req.method === 'PUT') {
    return authMiddleware(async (req, res) => {
      try {
        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { 
            ...req.body,
            updatedAt: Date.now()
          },
          { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Error updating user data' });
      }
    })(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}