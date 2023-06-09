import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { addTweet } from '../reducers/tweets';
import styles from '../styles/Tweet.module.css';

function Tweet(props) {

  const dispatch = useDispatch();

  const [messageContent, setMessageContent] = useState('');
  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const firstname = user.firstname;

  //// Create a new tweet in DB
  const createTweet = () => {
		fetch('http://localhost:3000/tweet', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: firstname, username: username, content: messageContent }),
		}).then(response => response.json())
			.then(data => {
        data.result && dispatch(addTweet(data.tweet));
        props.handleUpdateTweets();
				setMessageContent('');
			})
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.inputDiv} >
        <input className={styles.inputContent} type="text" placeholder="What's up?" maxLength="280" id="message" onChange={(e)=> setMessageContent(e.target.value)} value={messageContent}/>
      </div>
      <div className={styles.addTweet}>
        <span className={styles.signs}>{messageContent.length}/280</span>
        <button className={styles.btn} id="tweet" onClick={()=> createTweet()}>Tweet</button>
      </div>
    </div>
  );
}

export default Tweet;
