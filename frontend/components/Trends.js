import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Trends = (props) => {
    const [hashtags, setHashtags] = useState([])

    const fetchHashtag = () => {
        fetch('http://localhost:3000/tweet/hashtag')
        .then(response => response.json())
        .then(data => {
          setHashtags(data.tweets.hashtags);
        })
    };

    return (
        <div>
          <h2>Trends</h2>
          <div>
              <div key={props._id} className="flex items-center py-1">
                <span className="mr-2 text-blue-500"># {hashtags._id}</span>
                <span className="text-gray-500">{hashtags.count} tweet(s)</span>
              </div>
          </div>
        </div>
      );
}


export default Trends 