import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        const properties = await Property.find({})
          .sort({ createdAt: -1 })
          .limit(6);

        // Format the price and ensure images are present
        const formattedProperties = properties.map(property => ({
          ...property.toObject(),
          pricePerNight: Number(property.pricePerNight),
          images: property.images.length ? property.images : ['/images/placeholder.jpg']
        }));

        res.status(200).json(formattedProperties);
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Properties API error:', error);
    res.status(500).json({ message: 'Error fetching properties' });
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
