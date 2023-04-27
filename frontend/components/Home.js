import Link from 'next/link';
import Image from 'next/image';
import Tweet from './Tweet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { addTweet } from '../reducers/tweets';
import styles from '../styles/Home.module.css';


function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const firstname = user.firstname;

  const tweetsData = useSelector((state) => state.tweets.value);
  console.log(tweetsData);

  const [messageContent, setMessageContent] = useState('');

  const createTweet = () => {
    if (messageContent.length < 280) {
      dispatch(addTweet({ message: messageContent, date: Date.now }))
    }
  }

  const tweets = tweetsData.map((data, i) => {
    return <Tweet key={i} index={i} {...data} username={username} firstname={firstname} />;
  });

  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Redirection vers la page de connexion après la déconnexion
  };

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
              <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
      </div>

      <div className={styles.tweetsSection}>
        <h2>Home</h2>
        <div className={styles.inputDiv} >
          <input className={styles.inputContent} type="text" placeholder="What's up?" maxLength="280" id="message" onChange={(e)=> setMessageContent(e.target.value)} value={messageContent}/>
        </div>
        <div className={styles.addTweet}>
          <span className={styles.signs}>{messageContent.length}/280</span>
          <button className={styles.btn} id="tweet" onClick={()=> createTweet()}>Tweet</button>
        </div>
        <div className={styles.tweetsContainer}>
          {tweets}
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
