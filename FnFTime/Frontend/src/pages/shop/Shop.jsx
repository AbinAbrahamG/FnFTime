import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import './shop.scss';

export default function Shop() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handlePurchase = async (coupon) => {
    try {
      const res = await axios.post('http://localhost:7777/purchase', {
        userId: currentUser._id,
        coupon,
      });
      setMessage(res.data.message);
      // Update the user's rewards points
      currentUser.rewards = res.data.rewards;
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="shop-page">
      <h1>Shop</h1><br/>
      <p>Your Reward Points: {currentUser.rewards} RP</p>
      {message && <p className="message">{message}</p>}
      <div className="coupons">
        <div className="coupon" onClick={() => handlePurchase('puma')}>
            <p>Puma</p>
          <img src="/src/assets/img/puma-logo.png" alt="Puma" />
          <p style={{color:'red'}}>100 RP</p>
        </div>
        <div className="coupon" onClick={() => handlePurchase('adidas')}>
            <p>Adidas</p>
          <img src="/src/assets/img/adidas-logo.jpg" alt="Adidas" />
          <p style={{color:'red'}}>150 RP</p>
        </div>
        <div className="coupon" onClick={() => handlePurchase('flipkart')}>
            <p>Flipkart</p>
          <img src="/src/assets/img/flipkart-logo.png" alt="Flipkart" />
          <p style={{color:'red'}}>200 RP</p>
        </div>
        <div className="coupon" onClick={() => handlePurchase('amazon')}>
            <p>Amazon</p>
          <img src="/src/assets/img/amazon-logo.webp" alt="Amazon" />
          <p style={{color:'red'}}>200 RP</p>
        </div>
        <div className="coupon" onClick={() => handlePurchase('fastrack')}>
            <p>Fastrack</p>
          <img src="/src/assets/img/fastrack-logo.webp" alt="Fastrack" />
          <p style={{color:'red'}}>300 RP</p>
        </div>
      </div>
    </div>
  );
}