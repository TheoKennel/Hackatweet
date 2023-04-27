import styles from '../styles/Home.module.css';
import Link from 'next/link';

function Home() {
  return (
    <div>
      <main className={styles.main}>

      <div className={styles.leftSection}>
          <div className={styles.logo}>
            Logo
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
        <div className={styles.tweetInput}>
          Message
        </div>
        <div className={styles.divider}></div>
        <div className={styles.addTweet}>
          <span className={styles.tweetLength}>Tweet length</span>
          <div className={styles.tweetButton}>
            Tweet button
          </div>
        </div>
      </div>

      <div className={styles.trendsSection}>
        <h2>Trends</h2>
        <div className={styles.trendsCard}>
          <div className={styles.hashtag}>
            hashtag
          </div>
          <div className={styles.success}>
            <span>Number of tweets</span>
          </div>
        </div>
      </div>

      </main>
      <Link href="/login"><span>Link to Login</span></Link>
    </div>
  );
}

export default Home;
