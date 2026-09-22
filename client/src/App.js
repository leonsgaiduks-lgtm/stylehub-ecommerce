import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>StyleHub - Modern E-commerce Platform</title>
          <meta name="description" content="Shop the latest fashion trends with StyleHub. Premium quality clothing, accessories, and more with smart size recommendations." />
          <meta name="keywords" content="fashion, clothing, e-commerce, online shopping, StyleHub" />
          <meta property="og:title" content="StyleHub - Modern E-commerce Platform" />
          <meta property="og:description" content="Shop the latest fashion trends with StyleHub" />
          <meta property="og:type" content="website" />
        </Helmet>
        
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
