import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Parse query parameters
        const { location, priceRange, propertyType, amenities, featured } = req.query;
        
        // Build filter object
        const filter = {};
        
        if (location) {
          filter.location = { $regex: location, $options: 'i' };
        }
        
        if (priceRange) {
          const [min, max] = priceRange.split('-').map(Number);
          filter.pricePerNight = { $gte: min || 0 };
          if (max) filter.pricePerNight.$lte = max;
        }
        
        if (propertyType) {
          filter.propertyType = propertyType;
        }
        
        if (amenities) {
          const amenitiesList = amenities.split(',');
          filter.amenities = { $all: amenitiesList };
        }
        
        if (featured === 'true') {
          filter.featured = true;
        }
        
        // Execute query with filters
        const properties = await Property.find(filter)
          .sort({ createdAt: -1 })
          .limit(req.query.limit ? parseInt(req.query.limit) : 6);

        // Format the price and ensure images are present
        const formattedProperties = properties.map(property => ({
          ...property.toObject(),
          pricePerNight: Number(property.pricePerNight),
          images: property.images.length ? property.images : ['/images/placeholder.jpg']
        }));

        return res.status(200).json(formattedProperties);
      } catch (error) {
        console.error('Properties API error:', error);
        return res.status(500).json({ message: 'Error fetching properties' });
      }

    case 'POST':
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

          return res.status(200).json({ message: 'Property booked successfully', property });
        } catch (error) {
          return res.status(500).json({ message: 'Error booking property', error: error.message });
        }
      })(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
