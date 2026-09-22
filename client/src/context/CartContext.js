import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        updateCartCount(items);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Update cart count whenever items change
  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item._id === product._id && item.size === size
      );

      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity, size }];
      }

      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(
        item => !(item._id === productId && item.size === size)
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
