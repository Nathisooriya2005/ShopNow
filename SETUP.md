# Amazon Clone - Setup Guide

## 🚀 Quick Start

Follow these steps to get your Amazon Clone e-commerce website up and running:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Environment Setup

#### Backend Environment Variables
1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`
3. Update the following variables in `.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/amazon-clone
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amazon-clone

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (for email verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

### 2. Installation

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will create the database automatically

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### 4. Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### 5. Admin Access

To access the admin panel:
1. Register a new user account
2. Manually update the user's role to 'admin' in the database
3. Navigate to `/admin` to access the admin dashboard

## 📁 Project Structure

```
fullstack/
├── backend/
│   ├── config/          # Database and JWT configuration
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Authentication and error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads (created automatically)
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Backend dependencies
│   └── server.js        # Main server file
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React Context providers
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions and constants
│   │   ├── App.js       # Main React component
│   │   └── index.js     # React entry point
│   └── package.json     # Frontend dependencies
├── README.md            # Project overview
└── SETUP.md            # This setup guide
```

## 🌟 Features

### User Features
- **Authentication**: Register, login, email verification
- **Product Browsing**: Search, filter, sort products
- **Shopping Cart**: Add, update, remove items
- **Checkout**: Multi-step checkout with address and payment
- **User Profile**: Manage profile, addresses, orders
- **Responsive Design**: Works on desktop, tablet, and mobile

### Admin Features
- **Dashboard**: Overview of sales, orders, users
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: View and manage users
- **Category Management**: Organize product categories

### Technical Features
- **Backend**: Node.js, Express, MongoDB, JWT authentication
- **Frontend**: React, Context API, CSS Modules
- **Security**: Input validation, rate limiting, CORS protection
- **Performance**: Image optimization, lazy loading, caching

## 🔧 Development

### Available Scripts

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

#### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### API Endpoints

#### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user` - Get user orders
- `PUT /api/orders/:id/cancel` - Cancel order

#### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/products` - Admin product management
- `GET /api/admin/orders` - Admin order management

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

3. **CORS Errors**
   - Ensure FRONTEND_URL is correctly set in backend `.env`
   - Check that both servers are running

4. **Email Not Sending**
   - Use app-specific passwords for Gmail
   - Check email configuration in `.env`

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check that both backend and frontend servers are running

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on your platform
2. Ensure MongoDB Atlas is configured
3. Deploy the backend folder

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Configure environment variables if needed

## 📝 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Happy Coding! 🎉**
