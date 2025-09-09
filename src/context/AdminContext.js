import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const initialState = {
  dashboard: {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: []
  },
  products: [],
  orders: [],
  users: [],
  categories: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DASHBOARD':
      return { ...state, dashboard: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        )
      };
    case 'UPDATE_USER_STATUS':
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        )
      };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const loadDashboard = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/admin/dashboard');
      dispatch({ type: 'SET_DASHBOARD', payload: response.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load dashboard';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadProducts = async (page = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/admin/products', {
        params: { page, limit: state.pagination.limit }
      });
      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          total: response.data.total,
          totalPages: response.data.totalPages,
          page
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load products';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadOrders = async (page = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/admin/orders', {
        params: { page, limit: state.pagination.limit }
      });
      dispatch({ type: 'SET_ORDERS', payload: response.data.orders });
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          total: response.data.total,
          totalPages: response.data.totalPages,
          page
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load orders';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadUsers = async (page = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/admin/users', {
        params: { page, limit: state.pagination.limit }
      });
      dispatch({ type: 'SET_USERS', payload: response.data.users });
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          total: response.data.total,
          totalPages: response.data.totalPages,
          page
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load users';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get('/api/admin/categories');
      dispatch({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const createProduct = async (productData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/admin/products', productData);
      dispatch({ type: 'ADD_PRODUCT', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateProduct = async (id, updateData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.put(`/api/admin/products/${id}`, updateData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(`/api/admin/orders/${id}/status`, { status });
      dispatch({ type: 'UPDATE_ORDER_STATUS', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update order status';
      return { success: false, message };
    }
  };

  const updateUserStatus = async (id, isBlocked) => {
    try {
      const response = await axios.put(`/api/admin/users/${id}/status`, { isBlocked });
      dispatch({ type: 'UPDATE_USER_STATUS', payload: response.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update user status';
      return { success: false, message };
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await axios.post('/api/admin/categories', categoryData);
      await loadCategories();
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create category';
      return { success: false, message };
    }
  };

  const updateCategory = async (id, updateData) => {
    try {
      const response = await axios.put(`/api/admin/categories/${id}`, updateData);
      await loadCategories();
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update category';
      return { success: false, message };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/admin/categories/${id}`);
      await loadCategories();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete category';
      return { success: false, message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    loadDashboard,
    loadProducts,
    loadOrders,
    loadUsers,
    loadCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateUserStatus,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
