import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const property = await Property.findById(id).populate('owner', 'name email image');
      if (!property) return res.status(404).json({ message: 'Property not found' });
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property', error: error.message });
    }
  } 
  else if (req.method === 'PUT') {
    return authMiddleware(async (req, res) => {
      try {
        const session = await getServerSession(req, res, authOptions);
        const property = await Property.findById(id);
        
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
        
        // Check if user is the owner or an admin
        if (property.owner.toString() !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ message: 'Not authorized to update this property' });
        }
        
        // Update property with new data
        const updatedProperty = await Property.findByIdAndUpdate(
          id,
          { ...req.body, updatedAt: Date.now() },
          { new: true, runValidators: true }
        );
        
        res.status(200).json(updatedProperty);
      } catch (error) {
        res.status(500).json({ message: 'Error updating property', error: error.message });
      }
    })(req, res);
  } 
  else if (req.method === 'DELETE') {
    return authMiddleware(async (req, res) => {
      try {
        const session = await getServerSession(req, res, authOptions);
        const property = await Property.findById(id);
        
        if (!property) {
          return res.status(404).json({ message: 'Property not found' });
        }
        
        // Check if user is the owner or an admin
        if (property.owner.toString() !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ message: 'Not authorized to delete this property' });
        }
        
        await Property.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Property deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error: error.message });
      }
    })(req, res);
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
