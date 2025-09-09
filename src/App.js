import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <AdminProvider>
                <div className="App">
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      
                      {/* Protected Routes */}
                      <Route 
                        path="/cart" 
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/checkout" 
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <UserProfile />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Admin Routes */}
                      <Route 
                        path="/admin/*" 
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        } 
                      />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </AdminProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
