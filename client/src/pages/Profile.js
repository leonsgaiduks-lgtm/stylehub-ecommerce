import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Helmet>
        <title>My Profile - StyleHub</title>
      </Helmet>

      <div className="container">
        <h1>My Profile</h1>

        <div className="profile-grid">
          <div className="profile-card card">
            <h2>Personal Information</h2>
            <div className="info-row">
              <span className="label">Username:</span>
              <span className="value">{user.username}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{user.firstName} {user.lastName}</span>
            </div>
            <div className="info-row">
              <span className="label">Preferred Currency:</span>
              <span className="value">{user.preferences?.currency || 'USD'}</span>
            </div>
          </div>

          <div className="profile-card card">
            <h2>Order History</h2>
            <p className="empty-state">No orders yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
