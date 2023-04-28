import Image from 'next/image';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

function LastTweets(props) {

  // // Delete a tweet in DB
  // const handleTrashTweet = () => {

  // }



  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
        <span className={styles.userDetails}>{props.firstname} @{props.username} . {props.date}  </span>
      </div>
      <div className={styles.message}>
        {props.content}
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} onClick={()=> handleLikeTweet()}/>
        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
      </div>
    </div>
  );

}

export default LastTweets;
