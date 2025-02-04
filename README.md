## FauxDoorz - Vacation Rental Platform

**FauxDoorz** is a vacation rental platform built with **Next.js**, **MongoDB**, and **TailwindCSS**. Users can browse properties, search based on location and price, make bookings, and for admin users, manage properties.

### Table of Contents

- [FauxDoorz - Vacation Rental Platform](#fauxdoorz---vacation-rental-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Folder Structure](#folder-structure)
  - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)
    - [**Auth API**](#auth-api)
    - [**Properties API**](#properties-api)
    - [**Bookings API**](#bookings-api)
  - [Middleware](#middleware)
    - [**authMiddleware.js**](#authmiddlewarejs)
    - [**adminMiddleware.js**](#adminmiddlewarejs)
    - [**validatePropertyData.js**](#validatepropertydatajs)
    - [**validateBookingData.js**](#validatebookingdatajs)
  - [Models](#models)
    - [**User Model**](#user-model)
    - [**Property Model**](#property-model)
    - [**Booking Model**](#booking-model)
  - [Deployment](#deployment)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

---

### Features

- **User Authentication**: Users can sign up, log in, and view properties.
- **Search Functionality**: Users can filter properties by location and price range.
- **Bookings**: Authenticated users can book properties based on availability.
- **Admin Dashboard**: Admin users can manage properties (create, update, delete).
- **Responsive Design**: Uses **TailwindCSS** for a responsive and modern UI.

---

### Tech Stack

- **Frontend**: [Next.js](https://nextjs.org), [React](https://reactjs.org)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Database**: [MongoDB](https://www.mongodb.com)
- **Authentication**: [JWT (JSON Web Token)](https://jwt.io)
- **Styling**: [TailwindCSS](https://tailwindcss.com)

---

### Prerequisites

- **Node.js** (version 14+ recommended)
- **MongoDB** (local or MongoDB Atlas for cloud deployment)
- **PNPM** or **NPM** as the package manager

---

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/greendoorz.git
    cd greendoorz
    ```

2. **Install Dependencies**:
    If you're using **pnpm**:
    ```bash
    pnpm install
    ```

    For **npm**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run the Development Server**:
    ```bash
    pnpm dev
    ```
    Or, with **npm**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

### Folder Structure

```
greendoorz/
├── components/               # Reusable React components
├── lib/                      # Helper functions (database connection, authentication)
├── middleware/               # Middlewares for authentication and validation
├── models/                   # Mongoose models for User, Property, Booking
├── pages/                    # Next.js pages (includes API routes under `api/`)
│   ├── api/
│   │   ├── auth/             # Login, signup APIs
│   │   ├── properties/       # Property CRUD and search APIs
│   │   └── bookings/         # Booking CRUD APIs
├── public/                   # Static assets (images, icons)
├── styles/                   # Global and module-specific styles
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── tailwind.config.js        # TailwindCSS configuration
```

---

### Environment Variables

Ensure that you have the following environment variables in your `.env` file:

- **MONGODB_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWT tokens.

Example:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/greendoorz?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

---

### API Endpoints

#### **Auth API**

- **POST** `/api/auth/signup`: Create a new user account.
- **POST** `/api/auth/login`: Log in and receive a JWT token.

#### **Properties API**

- **GET** `/api/properties`: Fetch all properties or search based on location/price.
- **POST** `/api/properties`: Create a new property (Admin only).
- **GET** `/api/properties/[id]`: Get a single property by ID.
- **PUT** `/api/properties/[id]`: Update a property (Admin only).
- **DELETE** `/api/properties/[id]`: Delete a property (Admin only).

#### **Bookings API**

- **GET** `/api/bookings`: Fetch all bookings (Admin only).
- **POST** `/api/bookings`: Create a new booking.
- **GET** `/api/bookings/[id]`: Get a booking by ID.
- **PUT** `/api/bookings/[id]`: Update a booking.
- **DELETE** `/api/bookings/[id]`: Delete a booking.

---

### Middleware

#### **authMiddleware.js**

- Protects routes by verifying the JWT token. Ensures that only authenticated users can access certain routes.

#### **adminMiddleware.js**

- Ensures that only admin users can perform certain actions (like creating, updating, or deleting properties).

#### **validatePropertyData.js**

- Validates property data (e.g., title, location, price) before creating or updating a property.

#### **validateBookingData.js**

- Validates booking data (e.g., property, start date, end date) before creating or updating a booking.

---

### Models

#### **User Model**
- Fields: `name`, `email`, `password`, `isAdmin`.
- Password is hashed before saving. Admin role is managed through the `isAdmin` field.

#### **Property Model**
- Fields: `title`, `description`, `location`, `price`, `images`, `owner`.
- Each property is linked to the user who created it (owner).

#### **Booking Model**
- Fields: `property`, `user`, `startDate`, `endDate`, `totalPrice`.
- Each booking is linked to a specific user and property.

---

### Deployment

To deploy the application, follow these steps:

1. **Build for Production**:
    ```bash
    pnpm build
    ```
    Or, with **npm**:
    ```bash
    npm run build
    ```

2. **Start the Production Server**:
    ```bash
    pnpm start
    ```

3. **Deploy to Vercel** (Optional):
   - If you're using [Vercel](https://vercel.com), simply connect your GitHub repository, and Vercel will handle the build and deployment automatically.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Acknowledgments

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)