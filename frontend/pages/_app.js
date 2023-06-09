import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Login from '../components/Login';
import Home from '../components/Home';
import Hashtag from '../components/Hashtag';

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tweets from '../reducers/tweets';
import likedTweets from '../reducers/likedTweets';
import user from '../reducers/user';

//redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({ tweets, likedTweets, user });
const persistConfig = { key: 'hackatweet', storage};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // const getPageContent = () => {
  //   if (router.pathname === '/tweet') {
  //     return <Home />;
  //   } else if (router.pathname.startsWith('/hashtag')){
  //     return <Hashtag/>
  //   } else {
  //     return <Login />;
  //   }
  // };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Hackatweet</title>
        </Head>
        {/* {getPageContent()} */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
