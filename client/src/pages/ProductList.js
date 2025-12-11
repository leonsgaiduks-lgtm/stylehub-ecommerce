import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import './ProductList.css';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    const category = searchParams.get('category');
    setFilters(prev => ({ ...prev, category: category || '' }));
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(1);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.sort]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 12
      });
      
      // Only add filters if they have values
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);

      const response = await axios.get(`http://localhost:5000/api/products?${params}`);
      setProducts(response.data.products);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
      setLoading(false);
      
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getCategoryInfo = () => {
    const categoryMap = {
      'Men': { title: "Men's Fashion", subtitle: 'Discover the latest trends in menswear', icon: '👔' },
      'Women': { title: "Women's Fashion", subtitle: 'Explore elegant styles for women', icon: '👗' },
      'Kids': { title: "Kids' Collection", subtitle: 'Fun and comfortable clothes for children', icon: '🧸' },
      'Accessories': { title: 'Accessories', subtitle: 'Complete your look with our accessories', icon: '👜' }
    };
    
    if (filters.category && categoryMap[filters.category]) {
      return categoryMap[filters.category];
    }
    
    return { title: 'All Products', subtitle: 'Browse our complete collection', icon: '🛍️' };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="product-list-page">
      <Helmet>
        <title>Shop All Products - StyleHub</title>
        <meta name="description" content="Browse our complete collection of premium fashion items. Filter by category, price, and more." />
      </Helmet>

      <div className="container">
        {/* Category Header */}
        <div className="category-header">
          <div className="category-info">
            <span className="category-icon">{categoryInfo.icon}</span>
            <div className="category-text">
              <h1>{categoryInfo.title}</h1>
              <p className="category-subtitle">{categoryInfo.subtitle}</p>
            </div>
          </div>
          <div className="results-count">
            <span className="count-number">{pagination.total}</span>
            <span className="count-label">Products</span>
          </div>
        </div>

        <div className="product-list-container">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Category</h3>
              <select 
                name="category" 
                value={filters.category} 
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-inputs">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="form-input"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>Sort By</h3>
              <select 
                name="sort" 
                value={filters.sort} 
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="-createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((product) => (
                    <Link key={product._id} to={`/products/${product._id}`} className="product-card card">
                      <div className="product-image">
                        <img src={product.images[0]} alt={product.name} />
                        {product.stock === 0 && (
                          <div className="out-of-stock-badge">Out of Stock</div>
                        )}
                      </div>
                      <div className="product-info">
                        <p className="brand">{product.brand}</p>
                        <h3>{product.name}</h3>
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

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      disabled={pagination.currentPage === 1}
                      onClick={() => fetchProducts(pagination.currentPage - 1)}
                      className="btn btn-outline"
                    >
                      Previous
                    </button>
                    <span className="page-info">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button 
                      disabled={pagination.currentPage === pagination.totalPages}
                      onClick={() => fetchProducts(pagination.currentPage + 1)}
                      className="btn btn-outline"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
