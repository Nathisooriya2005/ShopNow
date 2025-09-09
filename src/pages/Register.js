import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from 'react-icons/fi';

const RegisterContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
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
  
  &.success {
    border-color: #10b981;
    background: #f0fdf4;
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

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PasswordStrength = styled.div`
  margin-top: 10px;
  
  .strength-bar {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  
  .strength-fill {
    height: 100%;
    transition: all 0.3s ease;
    background: ${props => {
      if (props.strength === 'weak') return '#ef4444';
      if (props.strength === 'medium') return '#f59e0b';
      if (props.strength === 'strong') return '#10b981';
      return '#e5e7eb';
    }};
    width: ${props => {
      if (props.strength === 'weak') return '33%';
      if (props.strength === 'medium') return '66%';
      if (props.strength === 'strong') return '100%';
      return '0%';
    }};
  }
  
  .strength-text {
    font-size: 12px;
    color: #6b7280;
  }
`;

const Requirements = styled.div`
  margin-top: 10px;
  
  .requirement {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    margin-bottom: 5px;
    
    &.met {
      color: #10b981;
    }
    
    &.unmet {
      color: #6b7280;
    }
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const { error: showError, success } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };
      
      const result = await register(userData);
      
      if (result.success) {
        success('Registration successful! Welcome to AmazonClone!');
        navigate('/');
      } else {
        showError(result.message || 'Registration failed');
      }
    } catch (error) {
      showError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    showError(`${provider} registration is not implemented yet`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 'none', text: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score <= 2) return { strength: 'weak', text: 'Weak password' };
    if (score <= 3) return { strength: 'medium', text: 'Medium strength password' };
    return { strength: 'strong', text: 'Strong password' };
  };

  const passwordStrength = getPasswordStrength();

  const requirements = [
    { 
      text: 'At least 8 characters', 
      met: formData.password.length >= 8 
    },
    { 
      text: 'Contains lowercase letter', 
      met: /[a-z]/.test(formData.password) 
    },
    { 
      text: 'Contains uppercase letter', 
      met: /[A-Z]/.test(formData.password) 
    },
    { 
      text: 'Contains number', 
      met: /\d/.test(formData.password) 
    },
    { 
      text: 'Contains special character', 
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) 
    }
  ];

  return (
    <RegisterContainer>
      <RegisterCard>
        <BackButton to="/">
          <FiArrowLeft />
          Back to Home
        </BackButton>
        
        <Header>
          <h1>Create Account</h1>
          <p>Join AmazonClone and start shopping today</p>
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <ErrorMessage>
                  {errors.firstName}
                </ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <ErrorMessage>
                  {errors.lastName}
                </ErrorMessage>
              )}
            </FormGroup>
          </div>
          
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              autoComplete="new-password"
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
            
            <PasswordStrength strength={passwordStrength.strength}>
              <div className="strength-bar">
                <div className="strength-fill" />
              </div>
              <div className="strength-text">{passwordStrength.text}</div>
            </PasswordStrength>
            
            <Requirements>
              {requirements.map((req, index) => (
                <div key={index} className={`requirement ${req.met ? 'met' : 'unmet'}`}>
                  <FiCheck />
                  {req.text}
                </div>
              ))}
            </Requirements>
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              autoComplete="new-password"
            />
            <PasswordToggle
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              title={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
            {errors.confirmPassword && (
              <ErrorMessage>
                {errors.confirmPassword}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>
        
        <Divider>
          <span>or continue with</span>
        </Divider>
        
        <SocialButton onClick={() => handleSocialRegister('Google')}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google" 
            width="20" 
            height="20" 
          />
          Continue with Google
        </SocialButton>
        
        <Footer>
          <p>Already have an account?</p>
          <Link to="/login">Sign in here</Link>
        </Footer>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
