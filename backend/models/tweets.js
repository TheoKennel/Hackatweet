const mongoose = require('mongoose');



const tweetSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  date: { type: Date, default: Date.now },
  content: String,
  hashtags: [String],
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;