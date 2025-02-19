const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');

router.post('/purchase', async (req, res) => {
  const { userId, coupon } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const couponCost = {
      puma: 10,
      adidas: 150,
      flipkart: 200,
      amazon: 250,
      fastrack: 300,
    };

    if (user.rewards < couponCost[coupon]) {
      return res.status(400).send({ message: 'Not enough reward points' });
    }

    user.rewards -= couponCost[coupon];
    await user.save();

    res.status(200).send({ message: 'Coupon purchased successfully', rewards: user.rewards });
  } catch (error) {
    console.error('Error purchasing coupon:', error);
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = router;