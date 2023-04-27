import '../styles/globals.css';
import Head from 'next/head';
import Login from '../components/Login'
import Home from '../components/Home'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hackatweet</title>
      </Head>
      <Login/>
      <Home/>
      <Component {...pageProps} />
    </>
  );
}

export default App;
