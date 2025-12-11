import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context for currency management
const CurrencyContext = createContext();

// Custom hook to use currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

// Currency provider component
export const CurrencyProvider = ({ children }) => {
  // Load saved currency from localStorage or default to USD
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });
  const [rates, setRates] = useState({}); // Store exchange rates
  const [loading, setLoading] = useState(false);

  // Fetch rates on component mount
  useEffect(() => {
    fetchRates();
  }, []);

  // Fetch exchange rates from API
  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/currency/rates');
      setRates(response.data.rates || {});
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Fallback rates if API fails
      setRates({
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        RUB: 92.5
      });
    } finally {
      setLoading(false);
    }
  };

  // Change currency and save to localStorage
  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  // Convert price from USD to selected currency
  const convertPrice = (priceInUSD) => {
    if (!priceInUSD || !rates[currency]) {
      return priceInUSD;
    }
    return (priceInUSD * rates[currency]).toFixed(2);
  };

  // Format price with currency symbol
  const formatPrice = (priceInUSD) => {
    const converted = convertPrice(priceInUSD);
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      RUB: '₽'
    };
    return `${symbols[currency] || '$'}${converted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        changeCurrency,
        convertPrice,
        formatPrice,
        rates,
        loading
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
