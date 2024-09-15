import dbConnect from '../../../lib/dbConnect';
import Property from '../../../models/Property';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const properties = await Property.find({});
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newProperty = new Property(req.body);
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(500).json({ message: 'Error creating property' });
    }
  }
}
