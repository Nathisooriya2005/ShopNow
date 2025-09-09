import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.1)" points="0,1000 1000,0 1000,1000"/></svg>');
    background-size: cover;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(Link)`
  background: #ff9900;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
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
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #667eea;
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    width: 48px;
    height: 48px;
    color: #ff9900;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #1f2937;
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  p {
    color: #6b7280;
    line-height: 1.6;
  }
`;

const CategorySection = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
  h2 {
    font-size: 2.5rem;
    color: #1f2937;
    margin-bottom: 15px;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    color: #6b7280;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CategoryCard = styled(Link)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .content {
    padding: 20px;
  }
  
  h3 {
    color: #1f2937;
    margin-bottom: 10px;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  p {
    color: #6b7280;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .arrow {
    color: #ff9900;
    font-size: 1.2rem;
  }
`;

const ProductSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ViewAllButton = styled.div`
  text-align: center;
  margin-top: 40px;
  
  a {
    background: #ff9900;
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
      background: #e68900;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 153, 0, 0.3);
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff9900;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const { products, loading, loadProducts } = useProduct();
  const { isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Get featured products (top rated, best sellers, etc.)
      const featured = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
      setFeaturedProducts(featured);
    }
  }, [products]);

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and tech devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=200&fit=crop'
    },
    {
      id: 'clothing',
      name: 'Fashion & Clothing',
      description: 'Trendy styles for every occasion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      description: 'Everything for your perfect home',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop'
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      description: 'Gear for your active lifestyle',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to AmazonClone</HeroTitle>
          <HeroSubtitle>
            Discover amazing products at unbeatable prices. 
            Shop the latest trends with fast delivery and excellent customer service.
          </HeroSubtitle>
          <HeroButtons>
            <HeroButton to="/products">
              Shop Now
              <FiArrowRight />
            </HeroButton>
            {!isAuthenticated && (
              <HeroButton to="/register" className="secondary">
                Join Now
                <FiArrowRight />
              </HeroButton>
            )}
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionHeader>
            <h2>Why Choose AmazonClone?</h2>
            <p>We provide the best shopping experience with quality products and excellent service</p>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard>
              <FiTruck />
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered within 24-48 hours with our express shipping service.</p>
            </FeatureCard>
            
            <FeatureCard>
              <FiShield />
              <h3>Secure Shopping</h3>
              <p>Your data and payments are protected with bank-level security encryption.</p>
            </FeatureCard>
            
            <FeatureCard>
              <FiStar />
              <h3>Quality Products</h3>
              <p>We only sell products that meet our high quality standards and customer satisfaction.</p>
            </FeatureCard>
            
            <FeatureCard>
              <FiRefreshCw />
              <h3>Easy Returns</h3>
              <p>30-day return policy with hassle-free returns and full refunds.</p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <CategorySection>
        <div className="container">
          <SectionHeader>
            <h2>Shop by Category</h2>
            <p>Explore our wide range of product categories to find exactly what you need</p>
          </SectionHeader>
          
          <CategoryGrid>
            {categories.map((category) => (
              <CategoryCard key={category.id} to={`/products?category=${category.id}`}>
                <img src={category.image} alt={category.name} />
                <div className="content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <FiArrowRight className="arrow" />
                </div>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </div>
      </CategorySection>

      <ProductSection>
        <div className="container">
          <SectionHeader>
            <h2>Featured Products</h2>
            <p>Discover our most popular and highly-rated products</p>
          </SectionHeader>
          
          {loading ? (
            <LoadingSpinner>
              <div className="spinner"></div>
            </LoadingSpinner>
          ) : (
            <>
              <ProductGrid>
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ProductGrid>
              
              <ViewAllButton>
                <Link to="/products">
                  View All Products
                  <FiArrowRight />
                </Link>
              </ViewAllButton>
            </>
          )}
        </div>
      </ProductSection>
    </HomeContainer>
  );
};

export default Home;
