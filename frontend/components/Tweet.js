import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeTweet } from '../reducers/tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Tweet.module.css';

function Tweet(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleTrashTweet = () => {
    dispatch(removeTask(props));
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src="/egg.jpg" alt="twitterEgg" width={50} height={50} className={styles.logoImg}/>
        <span>{user.firstname} @{user.username} . postedTime</span>
      </div>
      <div className={styles.message}>
        <p>Mesaage with hashtags</p>
      </div>
      <div className={styles.tweetIcons}>
      <FontAwesomeIcon icon={faHeart} className={styles.like} onClick={()=> handleLikeTweet()}/>
      <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
      </div>
    </div>

  );
}

export default Task;
