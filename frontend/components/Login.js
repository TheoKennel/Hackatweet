import styles from '../styles/Login.module.css';
import Link from 'next/link'


function Login() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          We to <a href="https://nextjs.org">Next.js!</a>
          <Link href="/">
        <a>Go to Home</a>
      </Link>
        </h1>
      </main>
    </div>
  );
}

export default Login;
