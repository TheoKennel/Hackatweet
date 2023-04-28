
import { useEffect, useState } from 'react';
import LastTweets from '../components/LastTweets';
import styles from '../styles/Hashtag.module.css';
import Tweet from './Tweet';
import Trends from './Trends';
import Image from 'next/image';


const Hashtag = (props) => {

    const { hashtag } = props
    const[tweets, setTweets] = useState([])
    const[tweetSearch, setTweetSearch] = useState('')

    const handleLogoClick = () => {
      router.push('/tweet');
    };


    useEffect(() => { 

            fetch(`http://localhost:3000/tweet/hashtag/${hashtag}`)
            .then(response => response.json())
            .then(data => {
            console.log(data)
            setTweets(data.tweets.sort((a, b) => new Date(b.date) - new Date(a.date)));
            })
              
    }, []);




    
    const hastagTweet = tweets.map((tweet,i) => {
        const tweetDate = new Date(tweet.date)
        const timeOut = Math.floor((Date.now() - tweetDate) / 1000);
        let timeTweet = ''
        if (timeOut < 60) {
        timeTweet = `${timeOut} secondes`;
        } else if (timeOut >= 60 && timeOut < 3600) {
        const minutes = Math.floor(timeOut / 60);
        timeTweet = `${minutes} minutes`;
        } else if (timeOut >= 3600 && timeOut < 86400) {
        const hours = Math.floor(timeOut / 3600);
        timeTweet = `${hours} heures`;
        } else {
        timeTweet = `Plus d'un jour`;
        }
        return <LastTweets key={i} username={tweet.username} firstname={tweet.firstname} content={tweet.content} date={timeTweet} />;
    })

    return ( 
        <div>
      <main className={styles.main}>

      <div className={styles.leftSection}>
      <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className={styles.logoImg} onClick={handleLogoClick}/>
          </div>
       
      </div>

      <div className={styles.tweetsSection}>
      <div className={styles.mainHashtagTop}>

        <h2>Hashtag</h2>
        <input
            className={styles.inputHashtag}
            type="text"
            placeholder="Rechercher #"
            onChange={(e) => setTweetSearch(e.target.value)}
            value={tweetSearch}
          />
      </div>
      {hastagTweet}
        </div>
          


      <div className={styles.trendsSection}>     
        <Trends/>
      </div>

      </main>
    </div>    
    )

}

export default Hashtag