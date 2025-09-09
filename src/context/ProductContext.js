import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  filters: {
    category: '',
    priceRange: [0, 10000],
    brand: '',
    rating: 0,
    search: ''
  },
  sortBy: 'popularity',
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  }
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          category: '',
          priceRange: [0, 10000],
          brand: '',
          rating: 0,
          search: ''
        }
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load products when filters or pagination changes
  useEffect(() => {
    loadProducts();
  }, [state.filters, state.sortBy, state.pagination.page]);

  const loadCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories');
      dispatch({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const params = {
        page: state.pagination.page,
        limit: state.pagination.limit,
        sortBy: state.sortBy,
        ...state.filters
      };

      const response = await axios.get('/api/products', { params });
      
      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          total: response.data.total,
          totalPages: response.data.totalPages
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load products';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const searchProducts = async (searchTerm) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_FILTERS', payload: { search: searchTerm } });
      
      const response = await axios.get('/api/products/search', {
        params: { q: searchTerm }
      });
      
      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      dispatch({
        type: 'SET_PAGINATION',
        payload: {
          total: response.data.total,
          totalPages: response.data.totalPages,
          page: 1
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Search failed';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
    dispatch({ type: 'SET_PAGINATION', payload: { page: 1 } });
  };

  const updateSort = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
    dispatch({ type: 'SET_PAGINATION', payload: { page: 1 } });
  };

  const updatePage = (page) => {
    dispatch({ type: 'SET_PAGINATION', payload: { page } });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    dispatch({ type: 'SET_PAGINATION', payload: { page: 1 } });
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Product not found');
    }
  };

  const getRelatedProducts = async (categoryId, productId) => {
    try {
      const response = await axios.get(`/api/products/related/${categoryId}`, {
        params: { exclude: productId, limit: 4 }
      });
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const value = {
    ...state,
    loadProducts,
    searchProducts,
    updateFilters,
    updateSort,
    updatePage,
    clearFilters,
    getProductById,
    getRelatedProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
