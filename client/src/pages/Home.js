import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?limit=4');
        setFeaturedProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>Home - StyleHub | Premium Fashion Online</title>
        <meta name="description" content="Discover the latest fashion trends at StyleHub. Shop premium clothing, accessories, and more with smart size recommendations and multi-currency support." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title fade-in">Discover Your Style</h1>
          <p className="hero-subtitle fade-in">Premium fashion for everyone, everywhere</p>
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Size Recommendations</h3>
              <p>Get perfect fit suggestions using advanced technology</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <h3>Multi-Currency Support</h3>
              <p>Shop in your preferred currency with real-time conversion</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Fast Shipping</h3>
              <p>Free shipping on orders over $50 worldwide</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Secure Shopping</h3>
              <p>Your data is protected with industry-leading security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="product-card card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="brand">{product.brand}</p>
                    <div className="product-footer">
                      <span className="price">{formatPrice(product.price)}</span>
                      <div className="rating">
                        <span>★</span>
                        <span>{product.rating}</span>
                        <span className="review-count">({product.reviews?.length || 0})</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Link to="/products" className="view-all-link">View All Products</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/products?category=Men" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500" alt="Men" />
              </div>
              <h3>Men's Fashion</h3>
            </Link>

            <Link to="/products?category=Women" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500" alt="Women" />
              </div>
              <h3>Women's Fashion</h3>
            </Link>

            <Link to="/products?category=Kids" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500" alt="Kids" />
              </div>
              <h3>Kids' Fashion</h3>
            </Link>

            <Link to="/products?category=Accessories" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500" alt="Accessories" />
              </div>
              <h3>Accessories</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
