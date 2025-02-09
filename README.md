## FauxDoorz - Vacation Rental Platform

**FauxDoorz** is a modern vacation rental platform built with **Next.js 14**, **MongoDB**, **NextAuth.js**, and **TailwindCSS**. Users can browse properties, search based on location and price, and manage their listings.

### Features

- **User Authentication**: Secure authentication using NextAuth.js
- **Property Management**: Users can create, view, and manage their property listings
- **Image Upload**: Support for property images with preview
- **Responsive Design**: Mobile-first approach using TailwindCSS
- **Search & Filter**: Advanced property search with location and price filters
- **User Dashboard**: Personalized dashboard for property management
- **Real-time Validation**: Form validation and error handling
- **Session Management**: Secure session handling with MongoDB

### Tech Stack

- **Frontend**: 
  - Next.js 14
  - React 18
  - TailwindCSS
  - NextAuth.js
  - React Icons

- **Backend**: 
  - Next.js API Routes
  - MongoDB Atlas
  - Mongoose ODM
  - bcrypt for password hashing

- **Database**: 
  - MongoDB Atlas
  - Mongoose Schemas
  - Indexed Collections

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or pnpm

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
Create a `.env.local` file:
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

### Project Structure

```
fauxdoorz/
├── components/
│   ├── dashboard/
│   │   └── PropertyForm.js
│   ├── PropertyCard.js
│   ├── Navbar.js
│   └── Footer.js
├── models/
│   ├── User.js
│   ├── Property.js
│   └── Session.js
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth].js
│   │   │   ├── signup.js
│   │   │   └── session.js
│   │   └── properties/
│   │       ├── create.js
│   │       └── index.js
│   ├── auth/
│   │   ├── signin.js
│   │   └── signup.js
│   └── dashboard/
│       └── properties.js
└── utils/
    ├── dbConnect.js
    └── sessionTracker.js
```

### API Routes

#### Authentication
- `GET/POST /api/auth/signin`: NextAuth.js signin
- `GET/POST /api/auth/signout`: NextAuth.js signout
- `GET /api/auth/session`: Get current session
- `GET /api/auth/csrf`: Get CSRF token

#### Properties
- `GET /api/properties`: List all properties
- `POST /api/properties/create`: Create new property
- `GET /api/properties/[id]`: Get property details
- `PUT /api/properties/[id]`: Update property
- `DELETE /api/properties/[id]`: Delete property

### Models

#### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  properties: [ObjectId],
  createdAt: Date
}
```

#### Property Model
```javascript
{
  title: String,
  description: String,
  location: String,
  pricePerNight: Number,
  images: [String],
  owner: ObjectId,
  status: String,
  createdAt: Date
}
```

#### Session Model
```javascript
{
  userId: ObjectId,
  email: String,
  lastActivity: Date,
  isActive: Boolean,
  deviceInfo: String,
  ipAddress: String
}
```

### Environment Variables

Required environment variables:
```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License.

### Acknowledgments

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [TailwindCSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons)

> Note: Authentication is handled through NextAuth.js. Direct API endpoints for signin/signup are not used.