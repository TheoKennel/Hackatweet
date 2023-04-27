import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Login from '../components/Login';
import HomePage from './index';
import SignupPage from './signup';
import SigninPage from './signin';

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tweets from '../reducers/tweets';
import user from '../reducers/user';

//redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({ tweets, user });
const persistConfig = { key: 'hackatweet', storage};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getPageContent = () => {
    if (router.pathname === '/login') {
      return <Login />;
    } else if (router.pathname === '/signup') {
      return <SignupPage />;
    } else if (router.pathname === '/signin') {
      return <SigninPage />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Hackatweet</title>
        </Head>
        {getPageContent()}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
