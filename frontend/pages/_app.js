import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Login from '../components/Login';
import HomePage from './index';
import SignupPage from './signup';
import SigninPage from './signin';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getPageContent = () => {
    if (router.pathname === '/login') {
      return <Login />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <>
      <Head>
        <title>Hackatweet</title>
      </Head>
      {getPageContent()}
    </>
  );
}

export default MyApp;