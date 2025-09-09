import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiSearch, FiShoppingCart } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const NotFoundCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: #ff9900;
  margin: 0;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    font-size: 6rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  margin: 20px 0 15px 0;
  font-weight: 700;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(Link)`
  background: #ff9900;
  color: white;
  padding: 15px 25px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #e68900;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 153, 0, 0.3);
  }
  
  &.secondary {
    background: transparent;
    color: #ff9900;
    border: 2px solid #ff9900;
    
    &:hover {
      background: #ff9900;
      color: white;
    }
  }
`;

const SearchSection = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
`;

const SearchTitle = styled.h3`
  color: #1f2937;
  font-size: 1.2rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #ff9900;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  background: #ff9900;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e68900;
    transform: translateY(-2px);
  }
`;

const PopularLinks = styled.div`
  margin-top: 30px;
  
  h4 {
    color: #1f2937;
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  .links {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  a {
    color: #ff9900;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 15px;
    border-radius: 20px;
    border: 1px solid #ff9900;
    transition: all 0.3s ease;
    
    &:hover {
      background: #ff9900;
      color: white;
    }
  }
`;

const NotFound = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    if (searchTerm) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <NotFoundContainer>
      <NotFoundCard>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          Oops! The page you're looking for doesn't exist. 
          It might have been moved, deleted, or you entered the wrong URL.
        </ErrorMessage>
        
        <ActionButtons>
          <ActionButton to="/">
            <FiHome />
            Go Home
          </ActionButton>
          <ActionButton to="/products" className="secondary">
            <FiShoppingCart />
            Browse Products
          </ActionButton>
        </ActionButtons>
        
        <SearchSection>
          <SearchTitle>Can't find what you're looking for?</SearchTitle>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              name="search"
              placeholder="Search for products..."
              required
            />
            <SearchButton type="submit">
              <FiSearch />
            </SearchButton>
          </SearchForm>
        </SearchSection>
        
        <PopularLinks>
          <h4>Popular Categories</h4>
          <div className="links">
            <Link to="/products?category=electronics">Electronics</Link>
            <Link to="/products?category=clothing">Clothing</Link>
            <Link to="/products?category=home">Home & Garden</Link>
            <Link to="/products?category=sports">Sports</Link>
          </div>
        </PopularLinks>
      </NotFoundCard>
    </NotFoundContainer>
  );
};

export default NotFound;
