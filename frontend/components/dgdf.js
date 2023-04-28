const fetchHashtag = () => {
      fetch('http://localhost:3000/tweet/hashtag')
      .then(response => response.json())
      .then(data => {
        setHashtags(data.hashtags);
      })
  };