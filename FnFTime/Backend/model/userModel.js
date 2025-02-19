const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilepic: { type: String, default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" },
    rewards: { type: Number, default: 0 },
    rewardHistory: [
        {
          action: String,
          points: Number,
          date: { type: Date, default: Date.now },
        },
      ],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports=mongoose.model('user',userSchema);