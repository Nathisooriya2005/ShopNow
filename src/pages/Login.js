import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #6b7280;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: color 0.2s;
  
  &:hover {
    color: #ff9900;
  }
  
  @media (max-width: 480px) {
    position: static;
    margin-bottom: 20px;
    justify-content: center;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  p {
    color: #6b7280;
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f9fafb;
  
  &:focus {
    outline: none;
    border-color: #ff9900;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &.error {
    border-color: #ef4444;
    background: #fef2f2;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: color 0.2s;
  
  &:hover {
    color: #6b7280;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SubmitButton = styled.button`
  background: #ff9900;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #e68900;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 153, 0, 0.3);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 30px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    background: white;
    padding: 0 15px;
    color: #6b7280;
    font-size: 14px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    border-color: #ff9900;
    color: #ff9900;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 30px;
  
  p {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  a {
    color: #ff9900;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPassword = styled(Link)`
  color: #ff9900;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  display: block;
  margin-top: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { error: showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // Clear any existing errors when component mounts
    setErrors({});
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to the page they were trying to access or home
        navigate(from, { replace: true });
      } else {
        showError(result.message || 'Login failed');
      }
    } catch (error) {
      showError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    showError(`${provider} login is not implemented yet`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <BackButton to="/">
          <FiArrowLeft />
          Back to Home
        </BackButton>
        
        <Header>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue shopping</p>
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              autoComplete="email"
            />
            {errors.email && (
              <ErrorMessage>
                {errors.email}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              autoComplete="current-password"
            />
            <PasswordToggle
              type="button"
              onClick={togglePasswordVisibility}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
            {errors.password && (
              <ErrorMessage>
                {errors.password}
              </ErrorMessage>
            )}
            <ForgotPassword to="/forgot-password">
              Forgot your password?
            </ForgotPassword>
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </Form>
        
        <Divider>
          <span>or continue with</span>
        </Divider>
        
        <SocialButton onClick={() => handleSocialLogin('Google')}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google" 
            width="20" 
            height="20" 
          />
          Continue with Google
        </SocialButton>
        
        <Footer>
          <p>Don't have an account?</p>
          <Link to="/register">Sign up for free</Link>
        </Footer>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
