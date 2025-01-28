import dbConnect from '../../../lib/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
  } 
  else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  if (req.method === 'POST') {
    return authMiddleware(async (req, res) => {
      try {
        const { propertyId } = req.body;

        // Find the property
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        // Prevent double booking
        if (!property.available) {
          return res.status(400).json({ message: 'This property is already booked' });
        }

        // Mark property as booked
        property.available = false;
        await property.save();

        res.status(200).json({ message: 'Property booked successfully', property });
      } catch (error) {
        res.status(500).json({ message: 'Error booking property', error: error.message });
      }
    })(req, res);
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
