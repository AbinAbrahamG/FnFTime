const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  file: { type: String },
});

module.exports = mongoose.model('post', postSchema);
