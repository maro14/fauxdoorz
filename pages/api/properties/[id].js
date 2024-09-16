import dbConnect from '../../../lib/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';
import adminMiddleware from '../../../middlewares/adminMiddleware';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property' });
    }
  } 
  else if (req.method === 'PUT') {
    // Ensure only admins can update properties
    return authMiddleware(adminMiddleware(async (req, res) => {
      try {
        const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProperty) {
          return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(updatedProperty);
      } catch (error) {
        res.status(500).json({ message: 'Error updating property' });
      }
    }))(req, res);
  } 
  else if (req.method === 'DELETE') {
    // Ensure only admins can delete properties
    return authMiddleware(adminMiddleware(async (req, res) => {
      try {
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
          return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting property' });
      }
    }))(req, res);
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
