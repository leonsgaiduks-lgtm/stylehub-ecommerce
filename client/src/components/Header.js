import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { currency, changeCurrency } = useCurrency();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-top">
            <div className="container flex-between">
              <div className="header-info">
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="header-actions">
                <select 
                  value={currency} 
                  onChange={handleCurrencyChange}
                  className="currency-selector"
                >
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                  <option value="GBP">GBP £</option>
                  <option value="RUB">RUB ₽</option>
                </select>
                {user ? (
                  <>
                    <Link to="/profile" className="header-link">
                      Hello, {user.firstName || user.username}
                    </Link>
                    <button onClick={handleLogout} className="header-link btn-link">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="header-link">Login</Link>
                    <Link to="/register" className="header-link">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="header-main">
            <div className="container">
              <nav className="navbar">
                <button 
                  className="menu-toggle"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>

                <Link to="/" className="logo">
                  <h1>StyleHub</h1>
                </Link>

                <div className="header-icons">
                  <Link to="/cart" className="icon-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 2L9 6M15 2L15 6M4 8h16M6 8v10a2 2 0 002 2h8a2 2 0 002-2V8" />
                    </svg>
                    {cartCount > 0 && <span className="badge">{cartCount}</span>}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <div className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      <aside className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>All Products</Link>
          <Link to="/products?category=Men" onClick={() => setIsMenuOpen(false)}>Men</Link>
          <Link to="/products?category=Women" onClick={() => setIsMenuOpen(false)}>Women</Link>
          <Link to="/products?category=Kids" onClick={() => setIsMenuOpen(false)}>Kids</Link>
          <Link to="/products?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
        </nav>
      </aside>
    </>
  );
};

export default Header;
