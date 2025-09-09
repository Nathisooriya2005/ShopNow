# Amazon Clone - Full Stack E-commerce Website

A complete, modern, and responsive e-commerce website built with React, Node.js/Express, and MongoDB.

## Features

- **Authentication**: JWT-based login/signup with email verification
- **Product Catalog**: Advanced search, filtering, and sorting
- **Shopping Cart & Wishlist**: Persistent storage across sessions
- **Admin Panel**: Complete CRUD operations for products, categories, orders, and users
- **Responsive Design**: Mobile-first approach with CSS modules
- **Payment Integration**: Multiple payment options
- **Order Management**: Real-time order tracking
- **Reviews & Ratings**: User feedback system

## Tech Stack

### Frontend
- React 18 with functional components and hooks
- React Router for navigation
- Context API for state management
- CSS Modules for styling
- Responsive design

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables (see .env.example files)

5. Start the development servers:
   ```bash
   # Backend (port 5000)
   cd backend
   npm run dev

   # Frontend (port 3000)
   cd frontend
   npm start
   ```

## Default Admin Credentials
- Email: admin@amazonclone.com
- Password: admin123

## Project Structure

```
/frontend          - React frontend application
/backend           - Node.js/Express backend API
/docs              - Documentation files
```

## API Documentation

The API follows RESTful conventions with the following main endpoints:

- `/api/auth` - Authentication routes
- `/api/products` - Product management
- `/api/users` - User management
- `/api/orders` - Order management
- `/api/admin` - Admin operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
