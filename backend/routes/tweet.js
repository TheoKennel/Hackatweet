var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets')
const { checkBody } = require('../modules/checkBody');

// Route pour créer un nouveau tweet
router.post('/', (req, res) => {
  const { content } = req.body;
  const { username, firstname } = req.body; 

  // Vérifier que le champ 'content' est présent
  if (!checkBody(req.body, ['content'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Utilise une expression régulière pour extraire les hashtags du contenu
  const hashtags = content.match(/#\w+/g) || [];

  const newTweet = new Tweet({
    username,
    firstname,
    content,
    hashtags,
  });

  newTweet
    .save()
    .then((data) => {
      res.json({ data });
    })
});

// Route pour récupérer tous les tweets
router.get('/', (req, res) => {
  Tweet.find()
    .then((tweets) => {
      res.json({ result: true, tweets });
    })
});

//Route pour supprimer un tweet
router.delete('/:tweetId', (req,res) => {
  const { tweetId } = req.params
  
  Tweet.deleteOne({ _id : tweetId }) 
  .then((data) => {
    if(data.deletedCount > 0) {
    res.json({result: true})
  } else {
    res.json({ result: false})
  }
  })
})

// Récupère tous les hashtags
router.get('/hashtag', (req, res) => {
  Tweet.aggregate([
    { $unwind: "$hashtags" }, // Sépare chaque hashtag en un document distinct
    { $group: { _id : "$hashtags", count: { $sum: 1 } } }, // Compte le nombre de tweets pour chaque hashtag
  ])
    .then((hashtags) => {
      res.json({ result: true, hashtags });
    })
});


// Route pour récupérer les tweets par hashtag
router.get('/hashtag/:hashtag', (req, res) => {
  const { hashtag } = req.params;

  Tweet.find({ hashtags: hashtag })
    .then((tweets) => {
      console.log(tweets);
      res.json({ result: true, tweets });
    })
});

module.exports = router;