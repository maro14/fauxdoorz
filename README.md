# FauxDoorz - Modern Vacation Rental Platform

<p align="center">
  <img src="/public/faux.svg" alt="FauxDoorz Logo" width="120" />
</p>

**FauxDoorz** is a sophisticated vacation rental platform built with cutting-edge technologies including **Next.js 14**, **MongoDB**, **NextAuth.js**, and **TailwindCSS**. The platform enables users to discover beautiful vacation properties, search based on location and price range, and manage their own listings.

## ✨ Features

- **Seamless Authentication** - Secure user authentication powered by NextAuth.js
- **Comprehensive Property Management** - Create, view, edit, and manage property listings
- **Advanced Search & Filtering** - Find properties by location, price range, and amenities
- **Responsive Design** - Beautiful UI that works perfectly on all devices
- **Interactive User Dashboard** - Personalized dashboard for hosts and guests
- **Real-time Form Validation** - Immediate feedback during property creation and booking
- **Image Management** - Support for multiple property images with preview functionality
- **Secure Session Handling** - Robust session management with MongoDB

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **React 18** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud database service
- **Mongoose ODM** - MongoDB object modeling
- **NextAuth.js** - Authentication solution
- **bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account
- npm or pnpm package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fauxdoorz.git
cd fauxdoorz
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. **Start the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
fauxdoorz/
├── components/         # React components
│   ├── common/         # Shared components (buttons, forms, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (navbar, footer)
│   └── ui/             # UI components
├── models/             # Mongoose models
├── pages/              # Next.js pages and API routes
│   ├── api/            # API endpoints
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # User dashboard pages
│   └── properties/     # Property listing pages
├── public/             # Static assets
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 📡 API Routes

### Authentication
- `GET/POST /api/auth/signin` - Sign in with credentials
- `GET/POST /api/auth/signout` - Sign out current user
- `GET /api/auth/session` - Get current session data

### Properties
- `GET /api/properties` - List all properties (with optional filters)
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,         // 'user', 'host', 'admin'
  properties: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Property Model
```javascript
{
  title: String,
  description: String,
  location: String,
  pricePerNight: Number,
  images: [String],
  amenities: [String],
  bedrooms: Number,
  bathrooms: Number,
  maxGuests: Number,
  owner: ObjectId,
  status: String,      // 'available', 'booked', 'pending'
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

Required environment variables:
```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

Optional environment variables:
```plaintext
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
CLOUDINARY_URL=your_cloudinary_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [TailwindCSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons)

---

<p align="center">
  Made with ❤️ by Teheskhiel Fritz
</p>
```