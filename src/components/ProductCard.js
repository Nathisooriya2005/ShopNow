import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { formatPrice, calculateDiscount, generateStars } from '../utils/helpers';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background: #f8fafc;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  
  &:hover {
    background: #ff9900;
    color: white;
    transform: scale(1.1);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${props => props.type === 'sale' ? '#ef4444' : '#10b981'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1;
`;

const Content = styled.div`
  padding: 20px;
`;

const Category = styled.div`
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #ff9900;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  
  .stars {
    color: #fbbf24;
    font-size: 14px;
  }
  
  .rating-text {
    color: #6b7280;
    font-size: 14px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: #fef3c7;
  color: #92400e;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.primary {
    background: #ff9900;
    color: white;
    
    &:hover {
      background: #e68900;
    }
    
    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #e5e7eb;
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const StockStatus = styled.div`
  text-align: center;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
  
  &.in-stock {
    background: #d1fae5;
    color: #065f46;
  }
  
  &.low-stock {
    background: #fef3c7;
    color: #92400e;
  }
  
  &.out-of-stock {
    background: #fee2e2;
    color: #991b1b;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { success, error: showError } = useNotification();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    _id,
    name,
    price,
    originalPrice,
    category,
    rating,
    reviewCount,
    images,
    stock,
    brand
  } = product;

  const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const getStockStatus = () => {
    if (isOutOfStock) return { text: 'Out of Stock', className: 'out-of-stock' };
    if (isLowStock) return { text: `Only ${stock} left`, className: 'low-stock' };
    return { text: 'In Stock', className: 'in-stock' };
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showError('Please login to add items to cart');
      return;
    }

    if (isOutOfStock) {
      showError('This item is out of stock');
      return;
    }

    setIsAddingToCart(true);
    try {
      const result = await addToCart(_id, 1);
      if (result.success) {
        success('Added to cart successfully!');
      } else {
        showError(result.message || 'Failed to add to cart');
      }
    } catch (err) {
      showError('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      showError('Please login to add items to wishlist');
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = () => {
    // Navigate to product detail page
    window.location.href = `/product/${_id}`;
  };

  const stockStatus = getStockStatus();

  return (
    <Card>
      <ImageContainer>
        <img 
          src={images?.[0] || 'https://via.placeholder.com/300x250?text=No+Image'} 
          alt={name}
          loading="lazy"
        />
        
        {discount > 0 && (
          <Badge type="sale">-{discount}%</Badge>
        )}
        
        {stock === 0 && (
          <Badge type="out">Out of Stock</Badge>
        )}
        
        <ImageOverlay>
          <OverlayButton onClick={handleQuickView} title="Quick View">
            <FiEye />
          </OverlayButton>
          <OverlayButton onClick={handleWishlist} title="Add to Wishlist">
            <FiHeart style={{ fill: isWishlisted ? '#ef4444' : 'none' }} />
          </OverlayButton>
        </ImageOverlay>
      </ImageContainer>
      
      <Content>
        <Category>{category?.name || 'Uncategorized'}</Category>
        
        <Title>
          <Link to={`/product/${_id}`}>
            {brand && <strong>{brand}</strong>} {name}
          </Link>
        </Title>
        
        <Rating>
          <span className="stars">{generateStars(rating)}</span>
          <span className="rating-text">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </Rating>
        
        <PriceContainer>
          <CurrentPrice>{formatPrice(price)}</CurrentPrice>
          {originalPrice && originalPrice > price && (
            <>
              <OriginalPrice>{formatPrice(originalPrice)}</OriginalPrice>
              <Discount>-{discount}%</Discount>
            </>
          )}
        </PriceContainer>
        
        <StockStatus className={stockStatus.className}>
          {stockStatus.text}
        </StockStatus>
        
        <Actions>
          <ActionButton
            className="primary"
            onClick={handleAddToCart}
            disabled={isAddingToCart || isOutOfStock}
          >
            {isAddingToCart ? (
              'Adding...'
            ) : (
              <>
                <FiShoppingCart />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </>
            )}
          </ActionButton>
          
          <ActionButton
            className="secondary"
            onClick={handleWishlist}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <FiHeart style={{ fill: isWishlisted ? '#ef4444' : 'none' }} />
          </ActionButton>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;
