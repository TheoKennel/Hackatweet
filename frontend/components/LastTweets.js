import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { addLikedTweet, removeLikedTweet } from '../reducers/likedTweets';
import { removeTweet } from "../reducers/tweets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/LastTweets.module.css';

function LastTweets(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Style hashtag in blue
  const words = props.content.split(' ');
  const newContent = [];
  for (let i = 0; i < words.length; i++) {
    let wordStyle = {};
    if (words[i][0] === '#') {
      wordStyle = { 'color': '#2F9BF0'}
    }
    newContent.push(<span key={i} style={wordStyle}>{words[i] } </span>)
  }

  // Like a tweet or unlike it
  const handleLikeTweet = () => {
    if (props.isLiked) {
			dispatch(removeLikedTweet(props));
		} else {
			dispatch(addLikedTweet(props));
		}
  }
  let heartStyle = {};
  if (props.isLiked) {
    heartStyle = { 'color': 'red'};
  }

  //Delete a tweet in DB if only it is a logged user's one
  const handleTrashTweet = (id) => {
    if (props.username === user.username) {
      fetch(`http://localhost:3000/tweet/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        data.result && dispatch(removeTweet(id))
        props.handleUpdateTweets();
      })
    }
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
        <span className={styles.userDetails}>{props.firstname}</span>@{props.username} . {props.date}
      </div>
      <div className={styles.message}>
        {newContent}
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} style={heartStyle} onClick={()=> handleLikeTweet()}/>
        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=> handleTrashTweet(props.id)}/>
      </div>
    </div>
  );

}

export default LastTweets;
