import dbConnect from '../../../lib/dbConnect';
import Property from '../../../models/Property';
import authMiddleware from '../../../middlewares/authMiddleware';
import adminMiddleware from '../../../middlewares/adminMiddleware';
import validatePropertyData from '../../../middlewares/validatePropertyData';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { location, priceRange } = req.query;
      const query = {};
      
      if (location) {
        query.$text = { $search: location };
      }

      if ( priceRange) {
        const [ min , max] = priceRange.split('-').map(Number)
        query.price = {$gte: min };
        if (max !== Infinity ) query.price.$lte = max;
      }

      const properties = await Property.find(query);
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties' });
    }
  } 
  else if (req.method === 'POST') {
    // Ensure only admins can create properties
    return authMiddleware(adminMiddleware(validatePropertyData(async (req, res) => {
      try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json(newProperty);
      } catch (error) {
        res.status(500).json({ message: 'Error creating property' });
      }
    })))(req, res);
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
