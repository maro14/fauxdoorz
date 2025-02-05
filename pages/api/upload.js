import { IncomingForm } from 'formidable';
import { uploadImage } from '../../utils/cloudinary';
import { getSession } from 'next-auth/react';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form data' });
      }

      try {
        const file = files.file[0];
        const imageUrl = await uploadImage(file.filepath);
        res.status(200).json({ url: imageUrl });
      } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      }
    });
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ message: 'Server error' });
  }
} 