import dbConnect from '../../../utils/dbConnect';
import Property from '../../../models/Property';
import User from '../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    await dbConnect();

    const { 
      title, 
      description, 
      location, 
      pricePerNight, 
      images,
      bedrooms,
      bathrooms,
      maxGuests,
      amenities,
      propertyType,
      petsAllowed,
      smokingAllowed,
      checkInTime,
      checkOutTime,
      cleaningFee,
      serviceFee,
      featured
    } = req.body;

    // Validate required fields
    if (!title || !location || !pricePerNight || !bedrooms || !bathrooms || !maxGuests) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create property with owner reference
    const property = await Property.create({
      title,
      description,
      location,
      pricePerNight: Number(pricePerNight),
      images,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      maxGuests: Number(maxGuests),
      amenities: amenities || [],
      propertyType: propertyType || 'house',
      petsAllowed: petsAllowed || false,
      smokingAllowed: smokingAllowed || false,
      checkInTime: checkInTime || '3:00 PM',
      checkOutTime: checkOutTime || '11:00 AM',
      cleaningFee: Number(cleaningFee) || 50,
      serviceFee: Number(serviceFee) || 30,
      featured: featured || false,
      owner: session.user.id
    });

    // Update user's properties array
    await User.findByIdAndUpdate(
      session.user.id,
      { $push: { properties: property._id } }
    );

    res.status(201).json({ 
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: error.message });
  }
}