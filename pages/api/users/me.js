import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  await dbConnect();

  // GET request - fetch user profile
  if (req.method === 'GET') {
    try {
      const user = await User.findById(session.user.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user profile' });
    }
  }
  
  // PUT request - update user profile
  else if (req.method === 'PUT') {
    try {
      const { name, email, currentPassword, newPassword } = req.body;
      
      // Find the user
      const user = await User.findById(session.user.id).select('+password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Update basic info
      if (name) user.name = name;
      if (email && email !== user.email) {
        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== session.user.id) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        user.email = email;
      }
      
      // Handle password change if requested
      if (newPassword && currentPassword) {
        // Verify current password
        const isPasswordValid = await user.comparePassword(currentPassword);
        
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        // Set new password (will be hashed by the model middleware)
        user.password = newPassword;
      }
      
      // Save the updated user
      await user.save();
      
      // Return the updated user without password
      const updatedUser = await User.findById(user._id).select('-password');
      
      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: error.message || 'Error updating profile' });
    }
  }
  
  // Handle other HTTP methods
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}