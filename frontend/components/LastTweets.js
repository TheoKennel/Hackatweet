import Image from 'next/image';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

function LastTweets(props) {

  const [tweetsData, setTweetsData] = useState([]);

  const likedTweetsData = useSelector((state) => state.likedTweets.value);
  const dispatch = useDispatch();

  // Get all tweets in DB
  useEffect(() => {
    fetch('http://localhost:3000/tweet')
      .then(response => response.json())
      .then(data => {
        setTweetsData(data.tweets);
      });
  }, []);

  // Delete a tweet in DB
  const handleTrashTweet = () => {

  }

  const tweets = [...tweetsData];
  tweets.sort((a,b)=> a.date === b.date ? 0 : a.date ? -1 : 1);
  tweets.map((tweet, i) => {

    const timeOut = Math.floor((Date.now() - tweet.date) / 1000);
    if (timeOut < 60) {

    } else if (timeOut >=60 && timeOut < 3600) {

    } else if (timeOut >= 3600 && timeOut < 86400 ) {

    } else {

    }

    const isLiked = likedTweetsData.some(likedTweet => likedTweet.content === tweet.content);
    if (isLiked) {
			dispatch(removeBookmark(tweet));
		} else {
			dispatch(addBookmark(tweet));
		}

    let iconStyle = {};
	  if (isLiked) {
		  iconStyle = { 'color': 'red' };
	  }

    return (
      <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
          <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
          <span className={styles.userDetails}>{tweet.firstname} @{tweet.username} .  </span>
        </div>
        <div className={styles.message}>
          {tweet.message}
        </div>
        <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} style={iconStyle} onClick={()=> handleLikeTweet()}/>
        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
        </div>
      </div>
    );
  });
}

export default LastTweets;
