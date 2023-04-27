import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/SignIn.module.css";
import Image from "next/image";

function SignIn(props) {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  return (
    <div className={styles.modalSignIn}>
      <button className={styles.SignInCloseButton} onClick={props.closeModal}>
        X
      </button>
      <div className={styles.modalContent}>
        <Image
          src="/logoTwitterBlanc.png"
          alt="Logo Twitter"
          width={60}
          height={50}
        />
        <h1>Connect to Hackatweet</h1>
        <div className={styles.modalInputButton}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            className={styles.modalInput}
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button className={styles.modalButton}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
