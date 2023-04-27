import Link from 'next/link';
import Image from 'next/image';
import Tweet from './Tweet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { addTweet } from '../reducers/tasks';
import styles from '../styles/Home.module.css';

function Home() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const firstname = user.firstname;

  const tweetsData = useSelector((state) => state.tweets.value);

  const [messageContent, setMessageContent] = useState('');

  const createTweet = () => {
    dispatch(addTweet({ message: messageContent, date: Date(now) }))
  }

  const tweets = tweetsData.map((data, i) => {
    return <Task key={i} index={i} {...data} username={username} firstname={firstname} />;
  });

  return (
    <div>
      <main className={styles.main}>

      <div className={styles.leftSection}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className={styles.logoImg}/>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              User infos
            </div>
            <div className={styles.logout}>
              logout button
            </div>
        </div>
      </div>

      <div className={styles.tweetsSection}>
        <h2>Home</h2>
        <div className={styles.inputDiv} >
          <input className={styles.inputContent} type="text" placeholder="What's up?" id="message" onChange={(e)=> setMessageContent(e.target.value) value={messageContent}}/>
        </div>
        <div className={styles.addTweet}>
          <span className={styles.signs}>Signs Nbr</span>
          <button className={styles.btn} id="tweet" onClick={()=> createTweet()}>Tweet</button>
        </div>

      </div>

      <div className={styles.trendsSection}>
        <h2>Trends</h2>
        <div className={styles.trendsCard}>
          <div className={styles.hashtag}>
            #
          </div>
          <div className={styles.success}>
            <span>Number of tweets</span>
          </div>
        </div>
      </div>

      </main>
    </div>
  );
}

export default Home;
