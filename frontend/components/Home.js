import styles from '../styles/Login.module.css';
import Link from 'next/link'


function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          <Link href="/login">
        <a>Go to Login</a>
      </Link>
        </h1>
      </main>
    </div>
  );
}

export default Home;