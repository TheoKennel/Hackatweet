import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/SignUp.module.css";
import Image from "next/image";

function SignUp(props) {

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstname, setSignUpFirstName] = useState("");

  return (
    <div className={styles.modalSignUp}>
      <button className={styles.SignUpCloseButton} onClick={props.closeModal}>
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
            placeholder="Firstname"
            id="signUpFirstname"
            onChange={(e) => setSignUpFirstName(e.target.value)}
            value={signUpFirstname}
          />
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className={styles.modalInput}
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button className={styles.modalButton}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
