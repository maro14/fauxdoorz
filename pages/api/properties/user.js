import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const properties = await Property.find({ owner: session.user.id });
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 