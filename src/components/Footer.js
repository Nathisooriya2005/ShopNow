import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: #232f3e;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #ff9900;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
    
    &:hover {
      color: #ff9900;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #ccc;
  font-size: 14px;
  
  svg {
    color: #ff9900;
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #3a4a5c;
    color: white;
    border-radius: 50%;
    transition: all 0.2s;
    
    &:hover {
      background: #ff9900;
      transform: translateY(-2px);
    }
  }
`;

const Newsletter = styled.div`
  margin-top: 20px;
  
  p {
    color: #ccc;
    margin-bottom: 15px;
    font-size: 14px;
  }
  
  form {
    display: flex;
    gap: 10px;
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
  
  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: 2px solid #ff9900;
    }
  }
  
  button {
    background: #ff9900;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
    
    &:hover {
      background: #e68900;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #3a4a5c;
  padding-top: 20px;
  text-align: center;
  
  p {
    color: #999;
    font-size: 14px;
    margin: 0;
  }
  
  .links {
    margin-top: 10px;
    
    a {
      color: #999;
      text-decoration: none;
      margin: 0 10px;
      font-size: 12px;
      
      &:hover {
        color: #ff9900;
      }
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About Us</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Shop</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/deals">Deals & Promotions</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/gift-cards">Gift Cards</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Information</h3>
            <ContactInfo>
              <FiMapPin />
              <span>123 E-commerce St, Digital City, DC 12345</span>
            </ContactInfo>
            <ContactInfo>
              <FiPhone />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <FiMail />
              <span>support@amazonclone.com</span>
            </ContactInfo>
            
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FiInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FiYoutube />
              </a>
            </SocialLinks>
            
            <Newsletter>
              <p>Subscribe to our newsletter for updates and exclusive offers!</p>
              <form>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </Newsletter>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>&copy; {currentYear} AmazonClone. All rights reserved.</p>
          <div className="links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
