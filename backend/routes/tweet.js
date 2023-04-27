var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');

// Route pour créer un nouveau tweet
router.post('/', (req, res) => {
  const { username, firstname, content} = req.body;

  const hashtags = content.match(/#\w+/g) || [];

  const newTweet = new Tweet({
    username,
    firstname,
    content,
    hashtags,
  });

  newTweet.save()
    .then((tweet) => {
      res.status(201).json({ result: true, tweet });
    })
});

// Route pour récupérer tous les tweets
router.get('/', (req, res) => {
  Tweet.find()
    .then((tweets) => {
      res.status(200).json({ result: true, tweets });
    })
});

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