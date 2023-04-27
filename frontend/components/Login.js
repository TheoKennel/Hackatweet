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
				<Link href="/home"><span>Link to Home</span></Link>
      </main>
    </div>
  );
}

export default Login;
