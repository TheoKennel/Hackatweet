import Image from 'next/image';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeTweet } from '../reducers/tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Tweet.module.css';

function Tweet(props) {

  const dispatch = useDispatch();

  const timeOut = Date.now - props.date

  const message = props.message;

  const handleTrashTweet = () => {
    dispatch(removeTask(props));
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
        <span className={styles.userDetails}>{props.firstname} @{props.username} . {timeOut} </span>
      </div>
      <div className={styles.message}>
        {message}
      </div>
      <div className={styles.tweetIcons}>
      <FontAwesomeIcon icon={faHeart} className={styles.like} onClick={()=> handleLikeTweet()}/>
      <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
      </div>
    </div>

  );
}

export default Tweet;
