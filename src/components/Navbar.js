import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { debounce } from '../utils/helpers';

const NavbarContainer = styled.nav`
  background: #232f3e;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TopBar = styled.div`
  background: #131921;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  
  span {
    color: #ff9900;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 0 15px;
    max-width: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  background: white;
  border-radius: 4px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  outline: none;
  font-size: 14px;
  
  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  background: #ff9900;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  
  &:hover {
    background: #e68900;
  }
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1001;
  display: ${props => props.show ? 'block' : 'none'};
`;

const SuggestionItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background: #f8f8f8;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const CartBadge = styled.span`
  background: #ff9900;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  min-width: 18px;
  text-align: center;
`;

const UserDropdown = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1001;
  display: ${props => props.show ? 'block' : 'none'};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background: #f8f8f8;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  text-align: left;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background: #f8f8f8;
  }
`;

const MainNav = styled.div`
  background: #232f3e;
  padding: 8px 0;
  
  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 0;
  display: block;
  
  &:hover {
    color: #ff9900;
  }
`;

const MegaMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 600px;
  z-index: 1001;
  display: ${props => props.show ? 'block' : 'none'};
  padding: 20px;
  
  @media (max-width: 768px) {
    min-width: 300px;
    left: -100px;
  }
`;

const MegaMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MegaMenuSection = styled.div`
  h3 {
    color: #333;
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      color: #ff9900;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #232f3e;
    border-top: 1px solid #3a4a5c;
    z-index: 1000;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 20px;
  
  li {
    margin-bottom: 15px;
  }
  
  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #3a4a5c;
    
    &:hover {
      color: #ff9900;
    }
  }
`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const { categories, searchProducts } = useProduct();
  const { success } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const searchInputRef = useRef();
  const userDropdownRef = useRef();
  const megaMenuRefs = useRef({});

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (term) => {
      if (term.trim().length > 2) {
        try {
          const response = await searchProducts(term);
          setSearchSuggestions(response?.products?.slice(0, 5) || []);
        } catch (error) {
          setSearchSuggestions([]);
        }
      } else {
        setSearchSuggestions([]);
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm, debouncedSearch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      
      Object.values(megaMenuRefs.current).forEach(ref => {
        if (ref && !ref.contains(event.target)) {
          setShowMegaMenu(prev => ({ ...prev, [ref.dataset.category]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product._id}`);
    setSearchTerm('');
    setSearchSuggestions([]);
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    success('Logged out successfully');
    navigate('/');
  };

  const handleMegaMenuToggle = (category) => {
    setShowMegaMenu(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <NavbarContainer>
      <TopBar>
        <Logo to="/">
          Amazon<span>Clone</span>
        </Logo>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <SearchInput
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />
              <SearchButton type="submit">
                <FiSearch />
              </SearchButton>
            </SearchBar>
          </form>
          
          <SearchSuggestions show={searchFocused && searchSuggestions.length > 0}>
            {searchSuggestions.map((product) => (
              <SuggestionItem
                key={product._id}
                onClick={() => handleSuggestionClick(product)}
              >
                {product.name}
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        </SearchContainer>
        
        <UserActions>
          <ActionButton as={Link} to="/wishlist">
            <FiHeart />
            <span style={{ display: 'none' }}>Wishlist</span>
          </ActionButton>
          
          <ActionButton as={Link} to="/cart">
            <FiShoppingCart />
            <span style={{ display: 'none' }}>Cart</span>
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </ActionButton>
          
          <UserDropdown ref={userDropdownRef}>
            <ActionButton onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <FiUser />
              <span style={{ display: 'none' }}>Account</span>
            </ActionButton>
            
            <DropdownMenu show={showUserDropdown}>
              {isAuthenticated ? (
                <>
                  <DropdownItem to="/profile">My Profile</DropdownItem>
                  <DropdownItem to="/orders">My Orders</DropdownItem>
                  <DropdownItem to="/wishlist">Wishlist</DropdownItem>
                  {user?.role === 'admin' && (
                    <DropdownItem to="/admin">Admin Panel</DropdownItem>
                  )}
                  <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
                </>
              ) : (
                <>
                  <DropdownItem to="/login">Login</DropdownItem>
                  <DropdownItem to="/register">Register</DropdownItem>
                </>
              )}
            </DropdownMenu>
          </UserDropdown>
          
          <MobileMenuButton onClick={handleMobileMenuToggle}>
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </UserActions>
      </TopBar>
      
      <MainNav>
        <div className="container">
          <NavList>
            {categories.slice(0, 8).map((category) => (
              <NavItem
                key={category._id}
                ref={el => megaMenuRefs.current[category._id] = el}
                data-category={category._id}
                onMouseEnter={() => handleMegaMenuToggle(category._id)}
                onMouseLeave={() => handleMegaMenuToggle(category._id)}
              >
                <NavLink to={`/products?category=${category._id}`}>
                  {category.name}
                </NavLink>
                
                <MegaMenu
                  show={showMegaMenu[category._id]}
                  ref={el => megaMenuRefs.current[category._id] = el}
                >
                  <MegaMenuGrid>
                    <MegaMenuSection>
                      <h3>Popular in {category.name}</h3>
                      <ul>
                        <li><Link to={`/products?category=${category._id}&sort=popularity`}>Best Sellers</Link></li>
                        <li><Link to={`/products?category=${category._id}&sort=newest`}>New Arrivals</Link></li>
                        <li><Link to={`/products?category=${category._id}&sort=rating`}>Top Rated</Link></li>
                      </ul>
                    </MegaMenuSection>
                    
                    <MegaMenuSection>
                      <h3>Shop by Price</h3>
                      <ul>
                        <li><Link to={`/products?category=${category._id}&priceRange=0-100`}>Under $100</Link></li>
                        <li><Link to={`/products?category=${category._id}&priceRange=100-500`}>$100 - $500</Link></li>
                        <li><Link to={`/products?category=${category._id}&priceRange=500-1000`}>$500 - $1000</Link></li>
                      </ul>
                    </MegaMenuSection>
                  </MegaMenuGrid>
                </MegaMenu>
              </NavItem>
            ))}
          </NavList>
        </div>
      </MainNav>
      
      <MobileMenu show={showMobileMenu}>
        <MobileNavList>
          {categories.map((category) => (
            <li key={category._id}>
              <Link to={`/products?category=${category._id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </MobileNavList>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
