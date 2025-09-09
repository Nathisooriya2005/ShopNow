import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialState = {
  notifications: []
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const notification = {
      id,
      message,
      type,
      duration
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });

    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const success = (message, duration) => {
    addNotification(message, 'success', duration);
  };

  const error = (message, duration) => {
    addNotification(message, 'error', duration);
  };

  const warning = (message, duration) => {
    addNotification(message, 'warning', duration);
  };

  const info = (message, duration) => {
    addNotification(message, 'info', duration);
  };

  const value = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
