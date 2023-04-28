import Image from 'next/image';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

function LastTweets(props) {

  // Delete a tweet in DB
  const handleTrashTweet = () => {

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
        {tweet.content}
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} style={iconStyle} onClick={()=> handleLikeTweet(tweet)}/>
        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
      </div>
    </div>
  );

}

export default LastTweets;
