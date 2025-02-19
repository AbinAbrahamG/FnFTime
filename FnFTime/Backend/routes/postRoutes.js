const express = require('express');
const multer = require('multer');
const Post = require('../model/postModel');
const User = require('../model/userModel');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
// Create a new post
router.post('/create', upload.single('file'), async (req, res) => {
    try {
      const { userId, content } = req.body;
      const file = req.file ? req.file.path : null;
      if (!userId || !content) {
        return res.status(400).json({ message: 'User ID and content are required' });
      }
      const post = new Post({
        userId,
        content,
        file,
      });
      await post.save();
  
      const user = await User.findById(userId);
      if (user) {
        const rewardPoints = 5; // Points for creating a post
        user.rewards += rewardPoints;
  
        // Log reward history
        user.rewardHistory.push({
          action: 'Post created',
          points: rewardPoints,
        });
        await user.save();
      }
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get('/posts', async (req, res) => {
  try {
    const posts =await Post.find().populate('userId', 'name profilepic');
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like a post and reward the user
router.post('/:id/like', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
  
      post.likes += 1;
      await post.save();
  
      const user = await User.findById(post.userId);
      if (user) {
        const rewardPoints = 10; // Points for a like
        user.rewards += rewardPoints;
  
        // Log reward history
        user.rewardHistory.push({
          action: 'Post liked',
          points: rewardPoints,
        });
  
        await user.save();
      }
  
      res.status(200).json({ post, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }); 
  
router.post('/daily-login', async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const today = new Date().setHours(0, 0, 0, 0);
      const lastLogin = user.rewardHistory
        .filter(log => log.action === 'Daily login')
        .map(log => new Date(log.date).setHours(0, 0, 0, 0))
        .pop();
  
      if (lastLogin === today) {
        return res.status(200).json({ message: 'Already rewarded for today!' });
      }
  
      const rewardPoints = 20; // Points for daily login
      user.rewards += rewardPoints;
  
      // Log reward history
      user.rewardHistory.push({
        action: 'Daily login',
        points: rewardPoints,
      });
  
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

module.exports = router;