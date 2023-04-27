import styles from '../styles/Login.module.css';
import Link from 'next/link';

function Login() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Login Page
        </h1>
				<Link href="/home"><span>Link to Home</span></Link>
      </main>
    </div>
  );
}

export default Login;
