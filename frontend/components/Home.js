import Image from 'next/image';
import Tweet from './Tweet';
import LastTweets from './LastTweets';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Trends from './Trends';

function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [tweetsData, setTweetsData] = useState([]);

  const likedTweetsData = useSelector((state) => state.likedTweets.value);

  // Get all tweets in DB
  const fetchTweets = () => {
    fetch('http://localhost:3000/tweet')
      .then(response => response.json())
      .then(data => {
        setTweetsData(data.tweets.sort((a, b) => new Date(b.date) - new Date(a.date)));
      });
  }
  useEffect(() => {
    fetchTweets();
  }, [likedTweetsData]);

  const tweetPoster = tweetsData.map((tweet, i) => {
    const isLiked = likedTweetsData.some(likedTweet => likedTweet.date === tweet.date);
    const tweetDate = new Date(tweet.date)
    const timeOut = Math.floor((Date.now() - tweetDate) / 1000);
    let timeTweet = ''
    if (timeOut < 60) {
      timeTweet = 'A few seconds';
    } else if (timeOut >= 60 && timeOut < 3600) {
      const minutes = Math.floor(timeOut / 60);
      timeTweet = `${minutes} minutes`;
    } else if (timeOut >= 3600 && timeOut < 86400) {
      const hours = Math.floor(timeOut / 3600);
      timeTweet = `${hours} hours`;
    } else {
      const days = Math.floor(timeOut / 86400);
      timeTweet = `${days} day(s)`;
    }
    return <LastTweets key={i} index={i} id={tweet._id} isLiked={isLiked} username={tweet.username} firstname={tweet.firstname} content={tweet.content} date={timeTweet} />;
  })

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
        <Tweet/>
        <div className={styles.tweetsContainer}>
          {tweetPoster}
        </div>
      </div>

      <div className={styles.trendsSection}>     
            <Trends/>
      </div>

      </main>
    </div>
  );
}

export default Home;
