import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId, size) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      removeFromCart(productId, size);
    }
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  return (
    <div className="cart-page">
      <Helmet>
        <title>Shopping Cart - StyleHub</title>
      </Helmet>

      <div className="container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item._id}-${item.size}-${index}`} className="cart-item card">
                  <img src={item.images?.[0]} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p className="price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item._id, item.size)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{calculateTotal() > 50 ? 'FREE' : formatPrice(5)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatPrice(calculateTotal() + (calculateTotal() > 50 ? 0 : 5))}</span>
              </div>
              <button className="btn btn-primary btn-large">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
