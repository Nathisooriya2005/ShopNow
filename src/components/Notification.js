import React from 'react';
import styled from 'styled-components';
import { FiCheck, FiX, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { useNotification } from '../context/NotificationContext';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  
  @media (max-width: 480px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const NotificationItem = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  &.exiting {
    animation: slideOut 0.3s ease-in forwards;
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d1fae5';
      case 'error': return '#fee2e2';
      case 'warning': return '#fef3c7';
      case 'info': return '#dbeafe';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Message = styled.p`
  margin: 0 0 4px 0;
  color: #1f2937;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  
  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  width: 100%;
  animation: progress ${props => props.duration}ms linear;
  
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FiCheck />;
    case 'error':
      return <FiAlertCircle />;
    case 'warning':
      return <FiAlertTriangle />;
    case 'info':
      return <FiInfo />;
    default:
      return <FiInfo />;
  }
};

const Notification = ({ notification, onRemove }) => {
  const { removeNotification } = useNotification();
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleRemove();
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  };

  return (
    <NotificationItem 
      type={notification.type} 
      className={isExiting ? 'exiting' : ''}
    >
      <IconContainer type={notification.type}>
        {getIcon(notification.type)}
      </IconContainer>
      
      <Content>
        <Message>{notification.message}</Message>
      </Content>
      
      <CloseButton onClick={handleRemove}>
        <FiX />
      </CloseButton>
      
      <ProgressBar 
        type={notification.type} 
        duration={notification.duration}
      />
    </NotificationItem>
  );
};

const NotificationSystem = () => {
  const { notifications } = useNotification();

  return (
    <NotificationContainer>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
        />
      ))}
    </NotificationContainer>
  );
};

export default NotificationSystem;
