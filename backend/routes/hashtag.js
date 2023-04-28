var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets')




// Récupère tous les hastags
router.get('/', (req, res) => {
    Tweet.find()
      .then((tweets) => {
        const hashtags = tweets.reduce((acc, tweet) => {
          // Concaténer tous les hashtags extraits de chaque tweet
          return acc.concat(tweet.hashtags);
        }, []);
  
        // Supprimer les doublons des hashtags
        const uniqueHashtags = [...new Set(hashtags)];
        res.status(200).json({ result: true, hashtags: uniqueHashtags });
      })
  });

module.exports = router;