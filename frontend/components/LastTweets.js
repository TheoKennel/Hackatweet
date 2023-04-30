import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { addLikedTweet, removeLikedTweet } from '../reducers/likedTweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

function LastTweets(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  let content = <span>{props.content}</span>;
  const hashtagPattern = /[\A#\w+]/;
  if (hashtagPattern.test(content)) {
    const hashtags = 
    content = <span style={{color: '#2F9BF0'}}>{props.content}</span>;
  }

  const handleLikeTweet = () => {
    if (props.isLiked && user.token) {
			dispatch(removeLikedTweet(props));
		} else {
			dispatch(addLikedTweet(props));
		}
  }
  let heartStyle = {};
  if (props.isLiked) {
    heartStyle = { 'color': 'red'};
  }

  //Delete a tweet in DB
  const handleTrashTweet = () => {
    fetch(`http://localhost:3000/tweet/${props.id}`, { method: 'DELETE' })
    .then(response => response.json());
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
        <span className={styles.userDetails}>{props.firstname}</span> @{props.username} . {props.date}
      </div>
      <div className={styles.message}>
        {content}
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} style={heartStyle} onClick={()=> handleLikeTweet()}/>
        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet()}/>
      </div>
    </div>
  );

}

export default LastTweets;
