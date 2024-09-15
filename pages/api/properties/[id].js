import dbConnect from '../../../lib/dbConnect';
import Property from '../../../models/Property';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching property' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
      res.status(200).json(updatedProperty);
    } catch (error) {
      res.status(500).json({ message: 'Error updating property' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedProperty = await Property.findByIdAndDelete(id);
      if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting property' });
    }
  }
}
