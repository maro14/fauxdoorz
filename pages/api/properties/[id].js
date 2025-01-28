import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property', error: error.message });
    }
  } 
  else if (req.method === 'PUT') {
    return authMiddleware(async (req, res) => {
      try {
        const { available } = req.body;

        // Prevent booking if already booked
        const property = await Property.findById(id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        if (property.available === false && available !== true) {
          return res.status(400).json({ message: 'This property is already booked' });
        }

        property.available = available;
        property.updatedAt = Date.now();
        await property.save();

        res.status(200).json(property);
      } catch (error) {
        res.status(500).json({ message: 'Error updating property status', error: error.message });
      }
    })(req, res);
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
