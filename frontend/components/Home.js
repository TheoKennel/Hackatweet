import Image from 'next/image';
import Tweet from './Tweet';
import LastTweets from './LastTweets';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { importTweets } from '../reducers/tweets';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Trends from './Trends';

function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const firstname = user.firstname;
  const username = `@${user.username}`;

  const tweetsData = useSelector((state) => state.tweets.value);

  const [isUpdate, setIsUpdate] = useState(false);

  const likedTweetsData = useSelector((state) => state.likedTweets.value);

  // Get all tweets in DB, updated if a new tweet is created or one is deleted thanks to inverse data flow
  useEffect(() => {
    fetch('http://localhost:3000/tweet')
    .then(response => response.json())
    .then(data => {
      data.result && dispatch(importTweets(data.tweets.sort((a, b) => new Date(b.date) - new Date(a.date))));
      setIsUpdate(false);
    });
  }, [isUpdate]);

  // Inverse data flow
  const handleUpdateTweets = () => {
    setIsUpdate(true);
  }

  const tweetPoster = tweetsData.map((tweet, i) => {
    const isLiked = likedTweetsData.some(likedTweet => likedTweet.id === tweet._id);
    const tweetDate = new Date(tweet.date)
    const timeOut = Math.floor((Date.now() - tweetDate) / 1000);
    let timeTweet = '';
    if (timeOut < 60) {
      timeTweet = 'a few seconds';
    } else if (timeOut >= 60 && timeOut < 3600) {
      const minutes = Math.floor(timeOut / 60);
      minutes < 2 ? timeTweet = `${minutes} minute` : timeTweet = `${minutes} minutes`;
    } else if (timeOut >= 3600 && timeOut < 86400) {
      const hours = Math.floor(timeOut / 3600);
      hours < 2 ? timeTweet = `${hours} hour` : timeTweet = `${hours} hours`;
    } else {
      const days = Math.floor(timeOut / 86400);
      days < 2 ? timeTweet = `${days} day` : timeTweet = `${days} days`;
    }
    return <LastTweets key={i} index={i} handleUpdateTweets={handleUpdateTweets} id={tweet._id} isLiked={isLiked} username={tweet.username} firstname={tweet.firstname} content={tweet.content} date={timeTweet} />;
  })

  const handleLogoClick = () => {
    router.push('/tweet');
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Redirection vers la page de connexion après la déconnexion
  };

  return (
    <div>
      <main className={styles.main}>

      <div className={styles.leftSection}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className={styles.logoImg} onClick={handleLogoClick}/>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <Image src="/egg.jpeg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
              {firstname}
              {username}
            </div>
            <div className={styles.logout}>
              <button className={styles.btn} onClick={handleLogout}>Logout</button>
            </div>
        </div>
      </div>

      <div className={styles.tweetsSection}>
        <h2>Home</h2>
        <Tweet handleUpdateTweets={handleUpdateTweets} />
        <div className={styles.tweetsContainer}>
          {tweetPoster}
        </div>
      </div>

      <div className={styles.trendsSection}>
        <h2>Trends</h2>
        <Trends isUpdate={isUpdate}/>
      </div>

      </main>
    </div>
  );
}

export default Home;
