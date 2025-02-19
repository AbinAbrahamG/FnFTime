const express = require('express');
const multer = require('multer');
const router = express.Router();
router.use(express.json());
const userModel = require('../model/userModel');
const jwt=require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
  
const upload = multer({ storage });

router.post('/login', async (req, res) => {
    const user=await userModel.findOne({email:req.body.email});
    if(!user){
        res.status(404).send({message:'Invalid Email'});
    }
    try{
        if(user.password==req.body.password){
            const payload={email:user.email,role: user.role};
            const token=jwt.sign(payload,'FnFTime');
            res.status(200).send({message:'Login Successful', token, userId: user._id, role: user.role });
        }
        else{
            res.status(404).send({message:'Invalid Credentials'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server Error' });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        const newUser = new userModel({
            name,
            email,
            password,
        });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }
        const user = await userModel.findById(userId).populate('friends', 'name profilepic');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: 'Server Error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Server Error' });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
      }
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ message: 'Server Error' });
    }
});

router.post('/user/:id/profilepic', upload.single('profilepic'), async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
      }
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      user.profilepic = req.file.path;
      await user.save();
      res.status(200).send({ message: 'Profile picture updated successfully', profilepic: user.profilepic });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).send({ message: 'Server Error' });
    }
});

router.post('/user/:id/addFriend', async (req, res) => {
    try {
        const userId = req.params.id;
        const friendId = req.body.friendId;
        if (!userId || !friendId) {
            return res.status(400).send({ message: 'User ID and Friend ID are required' });
        }
        const user = await userModel.findById(userId);
        const friend = await userModel.findById(friendId);
        if (!user || !friend) {
            return res.status(404).send({ message: 'User or Friend not found' });
        }
        user.friends.push(friendId);
        user.rewards += 3;
        user.rewardHistory.push({
        action: 'Friend added',
        points: 3,
    });
        await user.save();
        res.status(200).send({ message: 'Friend added successfully', user });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).send({ message: 'Server Error' });
    }
});

router.get('/suggestions', async (req, res) => {
    try {
      const users = await userModel.aggregate([{ $sample: { size: 3 } }]);
      res.status(200).send(users);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      res.status(500).send({ message: 'Server Error' });
    }
});

module.exports = router;