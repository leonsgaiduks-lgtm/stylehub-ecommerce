const express = require('express');
const axios = require('axios');
const router = express.Router();

// Currency conversion using Fixer API
router.get('/convert', async (req, res) => {
  try {
    const { amount, from, to } = req.query;
    
    // Validation
    if (!amount || !from || !to) {
      return res.status(400).json({ 
        error: 'Missing required parameters: amount, from, to' 
      });
    }
    
    // Use Fixer API
    const apiKey = process.env.FIXER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured' 
      });
    }
    
    const response = await axios.get(`https://api.apilayer.com/fixer/convert`, {
      params: { 
        amount, 
        from: from.toUpperCase(), 
        to: to.toUpperCase() 
      },
      headers: { 
        apikey: apiKey 
      }
    });
    
    res.json({
      success: true,
      amount: amount,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      result: response.data.result,
      rate: response.data.info?.rate,
      date: response.data.date
    });
  } catch (error) {
    console.error('Currency conversion error:', error.message);
    res.status(500).json({ 
      error: 'Failed to convert currency',
      message: error.response?.data?.message || error.message
    });
  }
});

// Get exchange rates
router.get('/rates', async (req, res) => {
  try {
    const { base = 'USD' } = req.query;
    const apiKey = process.env.FIXER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured' 
      });
    }
    
    const response = await axios.get(`https://api.apilayer.com/fixer/latest`, {
      params: { base: base.toUpperCase() },
      headers: { apikey: apiKey }
    });
    
    res.json({
      success: true,
      base: base.toUpperCase(),
      rates: response.data.rates,
      date: response.data.date
    });
  } catch (error) {
    console.error('Exchange rates error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch exchange rates',
      message: error.response?.data?.message || error.message
    });
  }
});

// Size recommendation (placeholder for Virtusize API)
router.post('/size-recommend', async (req, res) => {
  try {
    const { measurements, productId } = req.body;
    
    // Validation
    if (!measurements || !productId) {
      return res.status(400).json({ 
        error: 'Missing required parameters' 
      });
    }
    
    // For demonstration, return a mock recommendation
    // In production, integrate with actual Virtusize API
    const mockRecommendation = {
      success: true,
      productId,
      recommendedSize: 'M',
      confidence: 85,
      fit: 'Regular Fit',
      measurements: measurements,
      alternatives: [
        { size: 'S', confidence: 60, fit: 'Slim Fit' },
        { size: 'L', confidence: 70, fit: 'Relaxed Fit' }
      ]
    };
    
    res.json(mockRecommendation);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get size recommendation',
      message: error.message
    });
  }
});

module.exports = router;
