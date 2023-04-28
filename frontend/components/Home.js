import Image from 'next/image';
import Tweet from './Tweet';
import LastTweets from './LastTweets';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [tweetsData, setTweetsData] = useState([]);

  const likedTweetsData = useSelector((state) => state.likedTweets.value);

  // Get all tweets in DB
  useEffect(() => {
    fetch('http://localhost:3000/tweet')
      .then(response => response.json())
      .then(data => {
        setTweetsData(data);
      });
  }, []);

  // Like tweet
  const handleLikeTweet = () => {
    if (isLiked) {
			dispatch(removeLikedTweet(tweet));
		} else {
			dispatch(addLikedTweet(tweet));
		}
  };



  const tweets = tweetsData;
  if (tweets.length > 0) {
    tweets.sort((a,b)=> a.date === b.date ? 0 : a.date ? -1 : 1);
    tweets.map((tweet, i) => {
      const isLiked = likedTweetsData.some(likedTweet => likedTweet.date === tweet.date);
      const timeOut = Math.floor((Date.now() - tweet.date) / 1000);
      if (timeOut < 60) {

      } else if (timeOut >=60 && timeOut < 3600) {

      } else if (timeOut >= 3600 && timeOut < 86400 ) {

      } else {

      }
      <LastTweets key={i} isLiked={isLiked} tweet={...tweet} />;
    });
  }

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
          <LastTweets/>
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
