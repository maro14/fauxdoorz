import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';

export default async function handler(req, res) {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

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
          console.log('Fetching properties with filter:', JSON.stringify(filter));
          
          // Fetch properties
          const properties = await Property.find(filter)
            .sort({ createdAt: -1 })
            .limit(featured ? 6 : 100);
          
          console.log(`Found ${properties.length} properties`);
          return res.status(200).json(properties);
        } catch (error) {
          console.error('Error fetching properties:', error);
          return res.status(500).json({ message: 'Error fetching properties', error: error.toString() });
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
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ message: 'Server error', error: error.toString() });
  }
}
